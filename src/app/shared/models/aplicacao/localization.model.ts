export class LocalizationModel {
    constructor(
        public id?: number,
        public locationId?: number,
        public street?: string,
        public district?: string,
        public city?: string,
        public latitude?: number,
        public longitude?: number,
        public localizationDescription?: string,
    ) {
    }
}