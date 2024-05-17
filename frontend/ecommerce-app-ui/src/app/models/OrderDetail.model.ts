export class OrderDetail{
    constructor(
        public orderId: bigint,
        public productNames: string[],
        public fullName: string,
        public contactNumber: string,
        public fullAddress: string,
        public orderStatus: string
    ){}
}