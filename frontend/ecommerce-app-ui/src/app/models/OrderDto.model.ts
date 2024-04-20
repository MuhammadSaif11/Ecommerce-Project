import { OrderItemDto } from "./OrderItemDto.model";

export class OrderDto{
    constructor(
        public fullName?:string,
        public fullAddress?:string,
        public contactNumber?:string,
        public orderItem?:OrderItemDto[]
    ){}
}