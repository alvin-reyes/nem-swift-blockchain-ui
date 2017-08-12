import { Input, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountHttp, Address } from 'nem-library';

const accountHttp = new AccountHttp({
  protocol: 'http',
  domain: 'a1.nem.foundation',
  port: 7895
});


@Component({
  selector: 'app-multisig',
  templateUrl: './multisig.component.html',
  styleUrls: ['./multisig.component.css']
})
export class MultisigComponent implements OnInit {

  data = {};
  recipient: string;
  recipientPublickKey: string;
  sender: string;
  multisig: string;
  multisigPublicKey: string;
  swiftMessage: string;
  pageMessage: string;
  pageMessageClass: string;

  @Input()
  public alert: IAlert;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }

  getMultisigAddress() {
    accountHttp.getFromAddress(new Address(this.multisig)).subscribe(
      data => {
        console.log(data);
        this.multisigPublicKey = data.publicAccount.publicKey;
      });
  }
  getRecipientAddress() {
    accountHttp.getFromAddress(new Address(this.recipient)).subscribe(
      data => {
        console.log(data);
        this.recipientPublickKey = data.publicAccount.publicKey;
      });
  }
  sendNem() {

    //  get the public key for that address.
    this.data = {
      'multisig': this.multisigPublicKey,
      'sender': this.sender,
      'receipt': this.recipientPublickKey,
      'swift': this.swiftMessage
    };
    //
    this.http.post('http://localhost:8013/nemswiftsvc/transaction/send/multisig', this.data)
      .subscribe(transdata => {
        this.data = {};
      }, error => {
        this.pageMessage = error;
        this.pageMessageClass = 'alert alert-danger';
      }, () => {
        this.pageMessage = 'Transferred Successfully!';
        this.pageMessageClass = 'alert alert-success';
      });
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
