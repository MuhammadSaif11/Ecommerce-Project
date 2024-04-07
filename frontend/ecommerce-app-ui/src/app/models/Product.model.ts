export class Product{
    public get getProductID(): number {
        return this.productID;
    }
    public set setProductID(value: number) {
        this.productID = value;
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
        private productID?: number,
        private productName?: string,
        private productDescription?: string,
        private productActualPrice?: number,
        private productDiscountedPrice?: number,
        private productImages?:File[]
    ){}



}