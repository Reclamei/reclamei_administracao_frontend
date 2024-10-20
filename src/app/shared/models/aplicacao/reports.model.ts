import {HeatmapDataModel} from './heatmap-data.model';
import {MainProblemsModel} from './main-problems.model';
import {ResponseTimeModel} from './response-time.model';

export class ReportsModel {
    constructor(
        public heatmapData?: HeatmapDataModel[],
        public mainProblems?: MainProblemsModel[],
        public mainCitiesProblems?: MainProblemsModel[],
        public responseTimeGraph?: ResponseTimeModel[]
    ) {
    }
}
