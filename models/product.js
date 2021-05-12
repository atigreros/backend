export class Product {
    constructor(id, price, title, description, code, thumbnail, stock) {
        this.id = id;
        this.price = price;
        this.title = title;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.stock = stock;
        this.timestamp = Date.now();
      }
}