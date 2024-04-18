import { CartItem } from "./CartItem.model";

export class Cart{
    constructor(
        public cartId:bigint,
        public cartItems:CartItem[]
    ){}
}