import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sendnem',
  templateUrl: './sendnem.component.html',
  styleUrls: ['./sendnem.component.css']
})
export class SendnemComponent implements OnInit {

  data = {};
  recipient: string;
  sender: string;
  swiftMessage: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  sendNem() {
    this.data = { 'sender': this.sender, 'receipt': this.recipient, 'swift': this.swiftMessage };

    this.http.post('http://localhost:8013/nemswiftsvc/transaction/send', this.data).subscribe();
    console.log(this.data);
  }
}
