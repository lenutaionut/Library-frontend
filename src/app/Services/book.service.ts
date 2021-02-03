import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from '../Models/Book/book.model';

const LIBRARY_URL = "http://localhost:8070/books"

@Injectable({
    providedIn: 'root'
})

export class BookService {
    constructor(private httpClient: HttpClient) { }

    sendExcelFile(file: File) {
        const formData = new FormData();
        formData.append('file', file)
        return this.httpClient.post(LIBRARY_URL + '/upload', formData);
    }

    addBook(book: Book) {
        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('author', book.author);
        formData.append('price', book.price.toString());
        formData.append('pieces', book.pieces.toString());
        formData.append('status', book.status.toString());
        formData.append('image', book.image);
        return this.httpClient.post(LIBRARY_URL + '/add', formData);
    }

    getBookImage(bookId: number): Observable<Blob> {
        return this.httpClient.get(LIBRARY_URL + '/' + bookId + '/image', { responseType: 'blob' });
    }

    getBooks(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(LIBRARY_URL);
    }

    getBookById(id: number) {
        return this.httpClient.get(LIBRARY_URL + '/' + id);
    }

    buyBook(bookId: number): Observable<Book> {
        return this.httpClient.put<Book>(LIBRARY_URL + '/buy/' + bookId, {});
    }

    borrowBook(bookId: number): Observable<Book> {
        return this.httpClient.put<Book>(LIBRARY_URL + '/borrow/' + bookId, {});
    }

    returnBook(bookId: number) {
        return this.httpClient.put(LIBRARY_URL + '/return/' + bookId, {});
    }



}