export class HeadModel {
    constructor(
        public id?: number,
        public email?: string,
        public name?: string,
        public phone?: string,
        public isAdm?: boolean
    ) {
        isAdm = false;
    }
}
