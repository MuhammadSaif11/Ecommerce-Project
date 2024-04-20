import { OrderItem } from "./OrderItem.model";

export class Order{
    constructor(
        public orderId?:bigint,
        public orderItems?:OrderItem[],
        public fullName?:string,
        public fullAddress?:string,
        public contactNumber?:string,
        public orderStatus?:string,
        public orderTotalAmount?:bigint
    ){}
}