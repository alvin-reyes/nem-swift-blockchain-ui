import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountHttp, Address } from 'nem-library';

const accountHttp = new AccountHttp({
  protocol: 'http',
  domain: 'a1.nem.foundation',
  port: 7895
});

@Component({
  selector: 'app-sendnem',
  templateUrl: './sendnem.component.html',
  styleUrls: ['./sendnem.component.css']
})
export class SendnemComponent implements OnInit {

  data = {};
  recipient: string;
  recipientPublickKey: string;
  sender: string;
  swiftMessage: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  sendNem() {

    //  get the public key for that address.
    accountHttp.getFromAddress(new Address(this.recipient)).subscribe(data => {
      this.recipientPublickKey = data.publicAccount.publicKey;

      this.data = { 'sender': this.sender, 'receipt': this.recipientPublickKey, 'swift': this.swiftMessage };

      this.http.post('http://localhost:8013/nemswiftsvc/transaction/send', this.data).subscribe(transdata => {
        console.log(data);
        this.data = {};
//        this.recipient = '';
//        this.sender = '';
//        this.swiftMessage = '';
      });

    });
  }
}
