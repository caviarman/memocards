all:

build:
	cd client && npm i	
start:
	cd client && npm run build && cd .. && go run main.go
