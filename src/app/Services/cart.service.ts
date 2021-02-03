import { Injectable } from "@angular/core";
import { Book } from "../Models/Book/book.model";
import { BookService } from "./book.service";


@Injectable({
    providedIn: 'root'
})

export class CartService {
    items: Book[] = [];
    clicked= false;

    addToCart(product: Book) {
        this.items.push(product);
    }

    getItems() {
        return this.items;
    }

    clearCart() {
        this.items = [];
        return this.items;
    }

}