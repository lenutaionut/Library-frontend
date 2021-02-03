import { Status } from "../Status/status.model";

export interface Book {
    bookId: number;
    title: string;
    author: string;
    price: number;
    pieces: number;
    status: Status;
    image: File;
}