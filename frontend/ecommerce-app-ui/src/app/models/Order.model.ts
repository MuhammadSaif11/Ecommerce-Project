import { OrderItem } from "./OrderItem.model";

export class Order{
    constructor(
        public orderId?:bigint,
        public orderItems?:OrderItem[],
        public orderStatus?:string,
        public orderTotalAmount?:bigint
    ){}
}