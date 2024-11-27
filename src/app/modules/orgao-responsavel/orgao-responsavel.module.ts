import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {OrgaoResponsavelRoutingModule} from './orgao-responsavel-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {ReportsComponent} from './pages/reports/reports.component';
import {ReclamacoesComponent} from './pages/reclamacoes/reclamacoes.component';
import {ReclamationsTableComponent} from './pages/reclamacoes/reclamations-table/reclamations-table.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {ReclamationsEditComponent} from './pages/reclamacoes/reclamations-edit/reclamations-edit.component';
import {DetailedEvaluationComponent} from './pages/dashboard/detailed-evaluation/detailed-evaluation.component';
import {CoveragesComponent} from './pages/coverages/coverages.component';

@NgModule({
    declarations: [
        DashboardComponent,
        DetailedEvaluationComponent,
        ReclamacoesComponent,
        ReclamationsEditComponent,
        ReclamationsTableComponent,
        ReportsComponent,
        SettingsComponent,
        CoveragesComponent
    ],
    imports: [
        CommonModule,
        OrgaoResponsavelRoutingModule,
        SharedModule
    ]
})
export class OrgaoResponsavelModule {
}
