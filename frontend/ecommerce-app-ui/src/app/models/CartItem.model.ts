import { Product } from "./Product.model";

export class CartItem{
    constructor(
        public cartItemId?:bigint,
        public product?:Product,
        public quantity?:number,
    ){}
}