import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/Book/book.model';
import { BookService } from 'src/app/Services/book.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  clicked = false;
  items: Book[] = [];
  boughtBook!: Book;
  constructor(private cartService: CartService, private bookService: BookService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.items = this.cartService.clearCart();
  }

  buyProduct(bookId: number) {
    return this.bookService.buyBook(bookId).subscribe((book: Book) => {
      this.boughtBook = book;
      window.alert("Bought book!");
    })
  }

  deleteItem(item: Book){
    this.items.splice(this.items.indexOf(item),1);
  }
}
