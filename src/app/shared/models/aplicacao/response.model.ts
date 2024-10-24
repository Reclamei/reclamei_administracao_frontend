import {EvaluationModel} from './evaluation.model';

export class ResponseModel {
    constructor(
        public reclamationId?: number,
        public id?: number,
        public description?: string,
        public createdAt?: Date,
        public evaluation?: EvaluationModel,
    ) {
    }
}
