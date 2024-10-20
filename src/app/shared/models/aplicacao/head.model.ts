import {v4 as uuidv4} from 'uuid';

export class HeadModel {
    constructor(
        public id?: number,
        public companyId?: number,
        public externalId?: string,
        public email?: string,
        public name?: string,
        public phone?: string,
        public isAdmin?: boolean,
        public createdAt?: Date
    ) {
        this.isAdmin = false;
        this.externalId = uuidv4();
    }
}
