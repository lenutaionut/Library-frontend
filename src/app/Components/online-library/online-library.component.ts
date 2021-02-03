import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/Services/cart.service';
import { Book } from '../../Models/Book/book.model';
import { Status } from '../../Models/Status/status.model';
import { BookService } from '../../Services/book.service';
import { BorrowBookComponent } from '../borrow-book/borrow-book.component';

@Component({
  selector: 'app-online-library',
  templateUrl: './online-library.component.html',
  styleUrls: ['./online-library.component.css']
})
export class OnlineLibraryComponent implements OnInit {

  bookId!: number;
  Status = Status;
  books: Book[] = [];
  selectedBook!: Book;
  borrowedBook!: Book;
  addressForm!: FormGroup;
  imageFiles = new Map();

  constructor(private bookService: BookService, private modalService: NgbModal, private cartService: CartService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.addressForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      period: new FormControl('', Validators.required)
    });
  }

  onSelcted(book: Book): void {
    this.selectedBook = book;
  }

  getAllBooks() {
    return this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.getBookImages(data);
    });
  }

  getBookImages(bookList: Book[]) {
    if (bookList !== null) {
      bookList.forEach(book => {
        this.bookService.getBookImage(book.bookId).subscribe((bookImage: Blob) => {
          let objectURL = URL.createObjectURL(bookImage);
          const image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.imageFiles.set(book.bookId, image);
        });
      });
    }
  }

  borrowBook(bookId: number) {
    return this.bookService.borrowBook(bookId).subscribe((book: Book) => {
      this.borrowedBook = book;
      window.location.reload();
      window.alert("Borrowed book!")
    })
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book);
    window.alert("The book has been added to the cart!")
  }


  showDialog() {
    const modalRef = this.modalService.open(BorrowBookComponent);
    modalRef.componentInstance.modal_title = 'You borrowed this book';
    modalRef.componentInstance.modal_body = '...';
  }
}
