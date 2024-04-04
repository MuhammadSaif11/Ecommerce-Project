export class Product{
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
        private productName?: string,
        private productDescription?: string,
        private productActualPrice?: number,
        private productDiscountedPrice?: number,
    ){}



}