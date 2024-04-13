export class Product{
    public get getProductImages(): File[] {
        return this.productImages;
    }
    public set setProductImages(value: File[]) {
        this.productImages = value;
    }
    public get getProductId(): bigint {
        return this.productId;
    }
    public set setProductId(value: bigint) {
        this.productId = value;
    }
    public get getProductDiscountedPrice(): number {
        return this.productDiscountedPrice;
    }
    public set setProductDiscountedPrice(value: number) {
        this.productDiscountedPrice = value;
    }
    public get getProductDescription(): string {
        return this.productDescription;
    }
    public set setProductDescription(value: string) {
        this.productDescription = value;
    }
    public get getProductActualPrice(): number {
        return this.productActualPrice;
    }
    public set setProductActualPrice(value: number) {
        this.productActualPrice = value;
    }
    public get getProductName(): string {
        return this.productName;
    }
    public set setProductName(value: string) {
        this.productName = value;
    }

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