export class OrderItemDto{
    constructor(
        public productId: bigint,
        public quantity: number
    ){}
}