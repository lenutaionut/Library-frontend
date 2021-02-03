import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/Models/Book/book.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

  borrowedBook!: Book;

  @Input() modal_title: any;
  @Input() modal_body: any;

  constructor(public activeModal: NgbActiveModal, private bookService: BookService) { }

  ngOnInit(): void {

  }
  
  borrowBook(bookId: number) {
    return this.bookService.borrowBook(bookId).subscribe((book: Book) => {
      this.borrowedBook = book;
      window.location.reload();
      window.alert("Borrowed book!")
    })
  }
}
