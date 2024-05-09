import {v4 as uuidv4} from 'uuid';

export class HeadModel {
    constructor(
        public id?: number,
        public externalId?: string,
        public email?: string,
        public name?: string,
        public phone?: string,
        public isAdmin?: boolean
    ) {
        isAdmin = false;
        externalId = uuidv4();
    }
}
