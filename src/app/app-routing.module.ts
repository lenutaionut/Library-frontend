import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './Components/add-book/add-book.component';
import { CartComponent } from './Components/cart/cart.component';
import { OnlineLibraryComponent } from './Components/online-library/online-library.component';
import { PdfReportsComponent } from './Components/pdf-reports/pdf-reports.component';
import { ShowPdfComponent } from './Components/show-pdf/show-pdf.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: OnlineLibraryComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'cart', component: CartComponent },
  { path: 'reports', component: PdfReportsComponent },
  { path: 'reports/:id', component: ShowPdfComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
