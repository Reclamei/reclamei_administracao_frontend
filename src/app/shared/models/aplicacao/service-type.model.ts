import {ServiceSubtypeModel} from './service-subtype.model';

export class ServiceTypeModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public subtypesString?: string,
        public subtypes?: ServiceSubtypeModel[]
    ) {
        this.subtypes = [];
    }
}
