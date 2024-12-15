import socket
import threading

class TicTacToe:
	def __init__(self):
    	self.board = [' ' for _ in range(9)] 
    	self.current_turn = 'X'
    	self.winner = None

	def make_move(self, position):
    	if self.board[position] == ' ':
        	self.board[position] = self.current_turn
        	if self.check_winner():
            	self.winner = self.current_turn
        	self.current_turn = 'O' if self.current_turn == 'X' else 'X'
        	return True
    	return False

	def check_winner(self):
    	winning_combinations = [
        	(0, 1, 2), (3, 4, 5), (6, 7, 8),  # horizontal
        	(0, 3, 6), (1, 4, 7), (2, 5, 8),  # vertical
        	(0, 4, 8), (2, 4, 6)           	# diagonal
    	]
    	for a, b, c in winning_combinations:
        	if self.board[a] == self.board[b] == self.board[c] != ' ':
            	return True
    	return False

	def is_full(self):
    	return ' ' not in self.board

class GameSession(threading.Thread):
	def __init__(self, player1_socket, player2_socket):
    	super().__init__()
    	self.players = [player1_socket, player2_socket]
    	self.tic_tac_toe = TicTacToe()
    	self.start()

	def run(self):
    	self.players[0].sendall(b"You are Player 1 (X)\n")
    	self.players[1].sendall(b"You are Player 2 (O)\n")

    	while True:
        	for player in self.players:
            	self.send_board()
            	if self.tic_tac_toe.winner or self.tic_tac_toe.is_full():
                	break
               	 
            	current_player = 'X' if player == self.players[0] else 'O'
            	player.sendall(f"Player {current_player}'s turn!\n".encode())

            	move = self.get_move(player)
            	if self.tic_tac_toe.make_move(move):
                	if self.tic_tac_toe.winner:
                    	self.send_board()
                    	self.notify_players(f'Player {self.tic_tac_toe.winner} wins!\n')
                    	return
                	if self.tic_tac_toe.is_full():
                    	self.send_board()
                    	self.notify_players("It's a draw!\n")
                    	return
            	else:
                	player.sendall(b'Invalid move. Try again.\n')

	def send_board(self):
    	board_str = '\n'.join([
        	' | '.join(self.tic_tac_toe.board[i:i+3]) for i in range(0, 9, 3)
    	])
    	for player in self.players:
        	player.sendall(board_str.encode() + b'\n\n')  # Add extra newline for spacing

	def get_move(self, player):
    	while True:
        	move = player.recv(1024).decode().strip()
        	if move.isdigit() and 0 <= int(move) < 9:
            	return int(move)

	def notify_players(self, message):
    	for player in self.players:
        	player.sendall(message.encode())

def start_server():
	server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	port = 12345 
	while True:
    	try:
        	server_socket.bind(('0.0.0.0', port))
        	break  
    	except OSError:
        	port += 1  
	server_socket.listen()
	print(f"Server started on port {port}. Waiting for players...")

	clients = []
	while True:
    	client_socket, addr = server_socket.accept()
    	print(f"Player connected from {addr}")
    	clients.append(client_socket)

    	if len(clients) % 2 == 0:
        	GameSession(clients[-2], clients[-1])

    	if len(clients) % 2 == 1:
        	clients[-1].sendall(b'Waiting for another player to join...\n')

if __name__ == "__main__":
	start_server()

