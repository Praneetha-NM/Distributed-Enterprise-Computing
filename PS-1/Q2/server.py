import socket
import os
import threading

MAIN_SERVER_HOST = 'localhost'
MAIN_SERVER_PORT = 5004
STORAGE_SERVERS = [('localhost', 5001), ('localhost', 5002)]
FRAGMENT_SIZE = 1024  

def handle_storage_server(conn):
	while True:
    	data = conn.recv(FRAGMENT_SIZE)
    	if not data:
        	break
    	with open('storage_data.txt', 'ab') as f:
        	f.write(data)
	conn.close()

def storage_server(port):
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.bind(('localhost', port))
	s.listen(5)
	print(f'Storage server running on port {port}...')
	while True:
    	conn, addr = s.accept()
    	print(f'Connection from {addr}')
    	handle_storage_server(conn)

def main_server():
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.bind((MAIN_SERVER_HOST, MAIN_SERVER_PORT))
	s.listen(5)
	print('Main server running...')

	while True:
    	conn, addr = s.accept()
    	print(f'Client connected from {addr}')
    	file_name = conn.recv(1024).decode()
    	fragment_count = 0
    	with open(file_name, 'rb') as file:
        	while True:
            	fragment = file.read(FRAGMENT_SIZE)
            	if not fragment:
                	break
            	storage_server_index = fragment_count % len(STORAGE_SERVERS)
            	storage_conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            	storage_conn.connect(STORAGE_SERVERS[storage_server_index])
            	storage_conn.sendall(fragment)
            	storage_conn.close()
            	fragment_count += 1

    	conn.send(b'File uploaded successfully.')
    	conn.close()

for port in range(5001, 5003):
	threading.Thread(target=storage_server, args=(port,), daemon=True).start()

main_server()
