import {LocalizationModel} from './localization.model';

export class ReclamationModel {
    constructor(
        public id?: number,
        public citizenId?: number,
        public serviceSubtypeId?: number,
        public serviceName?: string,
        public serviceSubtypeName?: string,
        public description?: string,
        public analyzedAt?: Date,
        public createdAt?: Date,
        public photo?: string,
        public status?: string,
        public localization?: LocalizationModel
    ) {
        this.localization = new LocalizationModel();
    }
}
