import {ReclamationModel} from './reclamation.model';

export class ResponseModel {
    constructor(
        public reclamation?: ReclamationModel,
        public id?: number,
        public description?: string,
        public createdAt?: Date,
    ) {
    }
}
