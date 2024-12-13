import socket
import threading

class ChatServer:
    def __init__(self, host='localhost', port=12347):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((host, port))
        self.server_socket.listen()
        self.clients = []
        self.client_addresses = []

    def broadcast(self, message, client_socket):
        for client in self.clients:
            if client != client_socket:
                client.send(message)

    def handle_client(self, client_socket, address):
        client_index = len(self.clients) + 1
        print(f"Client {client_index} connected from {address}")
        self.clients.append(client_socket)
        self.client_addresses.append(address)

        while True:
            try:
                message = client_socket.recv(1024)
                if message:
                    formatted_message = f"Client {client_index}: {message.decode()}"
                    print(formatted_message)
                    self.broadcast(formatted_message.encode(), client_socket)
                else:
                    self.remove_client(client_socket)
                    break
            except Exception as e:
                print(f"Error: {e}")
                self.remove_client(client_socket)
                break

    def remove_client(self, client_socket):
        if client_socket in self.clients:
            self.clients.remove(client_socket)
            client_socket.close()

    def run(self):
        print("Server is running...")
        while True:
            client_socket, address = self.server_socket.accept()
            threading.Thread(target=self.handle_client, args=(client_socket, address)).start()

if __name__ == "__main__":
    chat_server = ChatServer()
    chat_server.run()
