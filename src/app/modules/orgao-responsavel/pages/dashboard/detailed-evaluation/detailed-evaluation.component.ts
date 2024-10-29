import {Component, Input} from '@angular/core';
import {DetailedEvaluation} from '../../../../../shared/models/aplicacao/detailed-evaluation.model';

@Component({
    selector: 'app-detailed-evaluation',
    templateUrl: './detailed-evaluation.component.html',
    styleUrls: ['./detailed-evaluation.component.scss']
})
export class DetailedEvaluationComponent {
    @Input() detailedEvaluation: DetailedEvaluation;
}
