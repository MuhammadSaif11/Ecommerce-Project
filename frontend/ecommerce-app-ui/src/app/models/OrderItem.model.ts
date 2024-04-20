import { Product } from "./Product.model";

export class OrderItem{
    constructor(
        public orderItemId?:bigint,
        public product?:Product,
        public quantity?:number
    ){}
}