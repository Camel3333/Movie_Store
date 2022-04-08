import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/models/history';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyItems: History[];
  loaded: boolean;


  constructor(
    private history: HistoryService
  ) { }

  ngOnInit(): void {
    this.loaded = false;

    this.history.getHistory()
      .then(hist => {
        this.historyItems = hist;
        this.loaded = true;
      })
      .catch(err => console.log(err));
  }

}
