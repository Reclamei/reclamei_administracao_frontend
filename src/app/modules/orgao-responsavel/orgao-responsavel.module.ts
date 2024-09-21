import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {OrgaoResponsavelRoutingModule} from './orgao-responsavel-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {ReportsComponent} from './pages/reports/reports.component';
import {ReclamacoesComponent} from './pages/reclamacoes/reclamacoes.component';
import {ReclamacoesTableComponent} from './pages/reclamacoes/reclamacoes-table/reclamacoes-table.component';
import {SettingsComponent} from './pages/settings/settings.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ReclamacoesComponent,
        ReclamacoesTableComponent,
        ReportsComponent,
        SettingsComponent
    ],
    imports: [
        CommonModule,
        OrgaoResponsavelRoutingModule,
        SharedModule
    ]
})
export class OrgaoResponsavelModule {
}
