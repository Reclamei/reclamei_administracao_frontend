import {LocationModel} from './location.model';
import {CompanyModel} from './company.model';
import {ServiceTypeModel} from './service-type.model';

export class CoverageModel {
    constructor(
        public company?: CompanyModel,
        public serviceType?: ServiceTypeModel,
        public locations?: LocationModel[]
    ) {
        this.locations = [];
    }
}
