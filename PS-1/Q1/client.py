import socket
import threading

class ChatClient:
    def __init__(self, host='localhost', port=12347):
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client_socket.connect((host, port))
        self.running = True
       
        threading.Thread(target=self.receive_messages, daemon=True).start()

    def receive_messages(self):
        while self.running:
            try:
                message = self.client_socket.recv(1024)
                if message:
                    print(message.decode())
                else:
                    break
            except Exception as e:
                print(f"Error: {e}")
                break

    def send_message(self, message):
        self.client_socket.send(message.encode())

    def run(self):
        while self.running:
            message = input("Enter a message: ")
            self.send_message(message)

if __name__ == "__main__":
    chat_client = ChatClient()
    chat_client.run()
