import { Component, OnInit } from '@angular/core';
import {
  AccountHttp, Address, MultisigTransaction, NEMLibrary, NetworkTypes, Transaction,
  TransactionTypes
} from 'nem-library';

const accountHttp = new AccountHttp({
  protocol: 'http',
  domain: 'a1.nem.foundation',
  port: 7895
});


NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
@Component({
  selector: 'app-alltransaction',
  templateUrl: './alltransaction.component.html',
  styleUrls: ['./alltransaction.component.css']
})
export class AlltransactionComponent implements OnInit {

  address: string;
  transactions = [];

  constructor() { }

  ngOnInit() {
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
}




