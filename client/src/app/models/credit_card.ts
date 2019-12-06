export class CreditCard {

    constructor (
        public _id: string,
        public name: string,
        public number: string,
        public date: string,
        public cvv: string,
        public franchise: string,
        public user: string
    ) { }
}