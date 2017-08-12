import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {
  AccountHttp, Address, MultisigTransaction, NEMLibrary, NetworkTypes, Transaction,
  TransactionTypes
} from 'nem-library';

const accountHttp = new AccountHttp({
  protocol: 'http',
  domain: 'a1.nem.foundation',
  port: 7895
});

NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
@Component({
  selector: 'app-alltransaction',
  templateUrl: './alltransaction.component.html',
  styleUrls: ['./alltransaction.component.css'],
  providers: [NgbModal],
  styles: [`
    .dark-modal {
      width: 100%;
    }
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
      width: 100%;
    }
    .dark-modal .close {
      color: white;
    }
  `]
})
export class AlltransactionComponent implements OnInit {

  closeResult: string;
  address: string;
  privatekey: string;
  transactions = [];
  modalOptions: NgbModalOptions;

  //  modal variables.
  decodedMessage: string;
  data = {};
  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit() { }

  decodeMessage(trans) {
    this.data = { 'sender': trans.signer.publicKey, 'receipt': this.privatekey, 'swift': trans.message.payload };
    this.http.post('https://swift-nem-bc.herokuapp.com/nemswiftsvc/transaction/decode', this.data)
      .subscribe(data => {
        this.decodedMessage = data['decodedMessage'];
      });
  }

  private handleErrorPromise(error: Response | any) {
    console.error(error);
    return Promise.reject(error.message || error);
  }

  private extractData(res: Response) {
    console.log(res);
    this.decodedMessage = res.toString();
  }

  open(content, trans) {
    this.decodeMessage(trans);
    this.modalService.open(content,{size:'lg', windowClass:'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getTransaction() {
    accountHttp.allTransactions(new Address(this.address))
      .map((transactions: Transaction[]): MultisigTransaction[] => {
        console.log('>>>>>>>>>>>>');
        console.log('All Transactions', transactions);
        this.transactions = transactions;
        return <MultisigTransaction[]>transactions.filter(x => x.type === TransactionTypes.MULTISIG);
      })
      .subscribe((x: MultisigTransaction[]) => {
        console.log('\n\n>>>>>>>>>>>>');
        console.log('Just Multisig', x);
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}




