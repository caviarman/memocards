FROM golang
COPY . /go/src/memocards
RUN apt update -y && apt install -y nodejs && apt install -y npm
RUN go get github.com/gin-gonic/gin github.com/gorilla/websocket
RUN npm install -g -y @angular/cli
RUN cd /go/src/memocards && make all
RUN go install memocards
ENTRYPOINT /go/bin/memocards
EXPOSE $PORT