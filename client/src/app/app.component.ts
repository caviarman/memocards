import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
// import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  userID;
  conn;
  cards;
  start = false;
  errors = 0;
  pair = [];
  constructor(
    private http: HttpClient,
    // private wsService: WebsocketService,
) {

}

ngOnInit() {
  this.userID = Math.random().toString(36).substr(2, 10);
  this.http.get('/cards').subscribe(cards => {
    this.cards = cards;
    this.cards.sort(() => Math.random() - 0.5);
  });
}


  onClickCard(id) {
    if (this.isReadyToCheck() || this.start) {
      return;
    }
    const index = this.cards.findIndex(item => item.id === id);
    if (this.cards[index].state === 'free') {
        this.cards[index].state = 'blocked';
        this.cards[index].userID = this.userID;
        this.conn.next({event: 'card', data: this.cards[index]});
        setTimeout(() => {
        if (this.isReadyToCheck()) {
          if (this.isCardsMatch()) {
            this.setCardsDone();
          } else {
            this.clearBlock();
          }
        }
      }, 2000);
    }
  }

  isBlockedByOtherUser(card) {
    return card.state === 'blocked' && card.userID !== this.userID;
  }

  isReadyToCheck() {
    return this.cards.filter(card => card.state === 'blocked' && card.userID === this.userID).length === 2;
  }
  isCardsMatch(): boolean {
    const cardsToCheck = this.cards.filter(card => card.state === 'blocked' && card.userID === this.userID);
    return cardsToCheck[0].name === cardsToCheck[1].name;
  }
  setCardsDone() {
    for (const card of this.cards) {
      if (card.state === 'blocked' && card.userID === this.userID) {
        card.state = 'done';
        // this.conn.next(card);
      }
    }
    this.conn.next({event: 'done', data: {userID: this.userID}});
    // this.cards = this.cards.map(card => {
    //   if (card.state === 'blocked' && card.userID === this.userID) {
    //     card.state = 'done';
    //     setTimeout(() => {
    //       this.conn.next(card);
    //     }, 300);
    //   }
    //   return card;
    // });
  }
  clearBlock() {
    this.errors++;
    for (const card of this.cards) {
      if (card.state === 'blocked' && card.userID === this.userID) {
        card.state = 'free';
        card.userID = '';
       // this.conn.next(card);
      }
    }
    this.conn.next({event: 'clear', data: {userID: this.userID}});
  }
  getBackground(card) {
    if (card.state === 'blocked' && card.userID !== this.userID) {
      return 'blue';
    }
    if (card.state === 'done' && card.userID === this.userID) {
      return 'green';
    }
    if (card.state === 'done' && card.userID !== this.userID) {
      return 'red';
    }
    if (card.state === 'blocked' || this.start) {
      return '';
    }
    return 'black';
  }
  onStart() {
    this.start = true;
    setTimeout(() => {
      this.start = false;
    }, 3000);
  }
  onReset() {
    location.reload();
  }
  onJoin() {
    this.conn = webSocket('ws://' + document.location.host + '/ws?userID=' + this.userID);
    this.conn.subscribe(req => {
      const {event, data} = req;
      if (!!event && !!data) {
        if (event === 'card' && data.userID !== this.userID) {
          const index = this.cards.findIndex(item => item.id === data.id);
          this.cards[index] = {...data};
        }
        if (event === 'clear' && data.userID !== this.userID) {
          this.cards = this.cards.map(card => {
            if (card.state === 'blocked' && card.userID === data.userID) {
              card.state = 'free';
              card.userID = '';
            }
            return card;
          });
        }
        if (event === 'done' && data.userID !== this.userID) {
          this.cards = this.cards.map(card => {
            if (card.state === 'blocked' && card.userID === data.userID) {
              card.state = 'done';
            }
            return card;
          });
        }
      }
    });
  }
}
