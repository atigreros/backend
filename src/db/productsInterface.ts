import type { Product } from "../types/product.ts";

export interface ProductsDB {

    findProductById(productId: string): Promise<Product>;

    findProducts(): Promise<Product[]>;
    
    createProduct(
        title: string,
        price: number,
        stock: number,
        thumbnail: string
    ): Promise<Product>;

    updateProduct (
        productId : string,
        title: string,
        price: number,
        stock: number,
        thumbnail: string
    ): Promise<Product>;

    deleteProduct (
        productId : string
      ): Promise<Product>;

}
