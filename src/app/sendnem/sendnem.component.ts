import { Input, Component, OnInit } from '@angular/core';
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
  pageMessage: string;
  pageMessageClass: string;

  @Input()
  public alert: IAlert;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }

  sendNem() {

    //  get the public key for that address.
    accountHttp.getFromAddress(new Address(this.recipient)).subscribe(data => {
      this.recipientPublickKey = data.publicAccount.publicKey;

      this.data = { 'sender': this.sender, 'receipt': this.recipientPublickKey, 'swift': this.swiftMessage };

      this.http.post('https://swift-nem-bc.herokuapp.com/nemswiftsvc/transaction/send', this.data)
        .subscribe(transdata => {
          this.data = {};
        }, error => {
          this.pageMessage = error;
          this.pageMessageClass = 'alert alert-danger';
        }, () => {
          this.pageMessage = 'Transferred Successfully!';
          this.pageMessageClass = 'alert alert-success';
        });

    }, error => {
      this.pageMessage = error.message;
      this.pageMessageClass = 'alert alert-danger';
    }, () => {
      this.pageMessage = 'Transfered Successfully!';
      this.pageMessageClass = 'alert alert-success';
    });
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
