import {DetailedEvaluation} from './detailed-evaluation.model';

export class DashboardModel {
    constructor(
        public totalCount?: number,
        public answeredCount?: number,
        public unansweredCount?: number,
        public resolvedCount?: number,
        public unresolvedCount?: number,
        public detailedEvaluation?: DetailedEvaluation,
    ) {
    }
}
