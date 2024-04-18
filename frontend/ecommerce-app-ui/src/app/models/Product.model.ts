export class Product{
    constructor
    (
        public productId?: bigint,
        public productName?: string,
        public productDescription?: string,
        public productActualPrice?: number,
        public productDiscountedPrice?: number,
        public productImages?: File[]
    ){}



}