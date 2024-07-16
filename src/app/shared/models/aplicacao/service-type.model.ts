import {ServiceSubtypeModel} from './service-subtype.model';

export class ServiceTypeModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public subtypesString?: string,
        public serviceSubtypes?: ServiceSubtypeModel[]
    ) {
        this.serviceSubtypes = [];
    }
}
