import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlineLibraryComponent } from './Components/online-library/online-library.component';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { BorrowBookComponent } from './Components/borrow-book/borrow-book.component';
import { CartComponent } from './Components/cart/cart.component';
import { PdfReportsComponent } from './Components/pdf-reports/pdf-reports.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ShowPdfComponent } from './Components/show-pdf/show-pdf.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    OnlineLibraryComponent,
    AddBookComponent,
    BorrowBookComponent,
    CartComponent,
    PdfReportsComponent,
    ShowPdfComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PdfViewerModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BorrowBookComponent]
})
export class AppModule { }
