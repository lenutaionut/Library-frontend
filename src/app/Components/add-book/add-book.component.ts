import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/Models/Book/book.model';
import { Status } from 'src/app/Models/Status/status.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: Book | undefined;
  title!: string;
  author!: string;
  price!: number;
  pieces!: number;
  status!: Status;
  image!: File;
  name!: String;
  wrongImageFormat: String = '';
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;
  excelMessage!: any;
  failExcelMessage! :any;

  excelFile!: File;
  wrongFileFormat: String = '';


  constructor(private bookService: BookService) { }

  bookSaveForm = new FormGroup({
    bookTitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
    bookAuthor: new FormControl('', [Validators.required, Validators.minLength(5)]),
    bookPrice: new FormControl('', [Validators.required, Validators.minLength(1)]),
    bookNumber: new FormControl('', [Validators.required, Validators.minLength(1)]),
    bookImage: new FormControl(''),
    excelFileForm: new FormControl('')
  });

  ngOnInit(): void {
  }

  checkData() {
    if (!this.title || !this.author || !this.price || !this.pieces || !this.image.name) {
      this.emptyData = "Please provide data in all fields!"
      setTimeout(() => {
        this.emptyData = '';
      },
        2000)
    }
    else {
      this.createBook();
    }
  }

  uploadExcelFile(event: any) {
    this.wrongFileFormat = "";
    this.excelFile = event.target.files[0]
    const checkExtension = (/\.(xls|xlsx)$/i);
    if (!checkExtension.test(this.excelFile.name)) {
      this.wrongFileFormat = "Wrong file format. Please try again!"
    }
  }

  sendExcelFile() {
    if (!this.excelFile) {
      this.excelMessage = "Upload a file!!"
      setTimeout(() => {
        this.excelMessage = '';
      },
        2000)
    }
    else
      if (this.wrongFileFormat === '') {
        this.bookService.sendExcelFile(this.excelFile)
          .subscribe((callback: any) => {
            if (callback) {
              this.excelMessage = callback.message.split("\n");
              setTimeout(() => {
                this.excelMessage = '';
              },
                7000)
            }
            else {
              this.failExcelMessage = "Something went wrong. Try again.";
              setTimeout(() => {
                this.failExcelMessage = '';
              },
                2000)
            }
          },
          
          (err: any) => {
            this.failExcelMessage = err.error.message;
            setTimeout(() => {
              this.failExcelMessage = '';
            },
              4000)
          })
        this.bookSaveForm.reset();
      }
  }

  uploadImage(event: any) {
    this.wrongImageFormat = "";
    this.image = event.target.files[0]
    const checkExtension = (/\.(gif|jpeg|jpg|png)$/i);
    if (!checkExtension.test(this.image.name)) {
      this.wrongImageFormat = "Wrong image format. Please try again!"
    }
  }

  createBook() {
    this.book = {
      bookId: null!,
      title: this.title,
      author: this.author,
      price: this.price,
      pieces: this.pieces,
      status: Status.AVAILABLE,
      image: this.image,
    };
    if (this.wrongImageFormat === '') {
      this.bookService.addBook(this.book)
        .subscribe(
          (callback: any) => {
            if (callback) {
              this.successMessage = callback.message;
              console.log(this.successMessage)
              setTimeout(() => {
                this.successMessage = '';
                //this.router.navigate(['/ ..]) - main page
                console.log(callback)
              },
                2000)
            }
            else {
              this.failMessage = "Something went wrong. Please try again!";
              setTimeout(() => {
                this.failMessage = '';
              },
                2000)
            }
          },

          (err: any) => {
            this.failMessage = err.error.message;
            setTimeout(() => {
              this.failMessage = '';
            },
              4000)
          })
      this.bookSaveForm.reset();
    }
  }
}
