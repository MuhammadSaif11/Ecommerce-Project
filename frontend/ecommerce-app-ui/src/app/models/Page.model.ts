export class Page<T>{
    constructor(
        public content: T[],
        public totalElements:number,
        public totalPages:number,
        public size:number,
        public number:number
    ){}
}