import {HeatmapDataModel} from './heatmap-data.model';
import {MainProblemsModel} from './main-problems.model';

export class ReportsModel {
    constructor(
        public heatmapData?: HeatmapDataModel[],
        public mainProblems?: MainProblemsModel[],
        public mainCitiesProblems?: MainProblemsModel[],
    ) {
    }
}