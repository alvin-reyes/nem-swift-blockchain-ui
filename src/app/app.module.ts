import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SendnemComponent } from './sendnem/sendnem.component';
import { HttpClientModule } from '@angular/common/http';
import { AlltransactionComponent } from './alltransaction/alltransaction.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SendnemComponent,
    AlltransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: SendnemComponent
      },
      {
        path: 'sendnem',
        component: SendnemComponent
      },
      {
        path: 'transaction',
        component: AlltransactionComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
