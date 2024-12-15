import socket

MAIN_SERVER_HOST = 'localhost'
MAIN_SERVER_PORT = 5004
FILE_TO_UPLOAD = '/home/cslinux/hi.txt'

def upload_file():
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.connect((MAIN_SERVER_HOST, MAIN_SERVER_PORT))
	s.send(FILE_TO_UPLOAD.encode())
	response = s.recv(1024)
	print(response.decode())
	s.close()

upload_file()


