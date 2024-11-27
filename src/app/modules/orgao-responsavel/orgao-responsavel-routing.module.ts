import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HomeComponent} from './pages/home/home.component';
import {ReclamacoesComponent} from './pages/reclamacoes/reclamacoes.component';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {ReportsComponent} from './pages/reports/reports.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {ReclamationsEditComponent} from './pages/reclamacoes/reclamations-edit/reclamations-edit.component';
import {CoveragesComponent} from './pages/coverages/coverages.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            {path: '', component: DashboardComponent},
            {path: MapeamentoRota.ROTA_RECLAMACOES.obterRota(), component: ReclamacoesComponent},
            {path: MapeamentoRota.ROTA_RECLAMACOES_EDIT.obterRota(), component: ReclamationsEditComponent},
            {path: MapeamentoRota.ROTA_ABRANGENCIA.obterRota(), component: CoveragesComponent},
            {path: MapeamentoRota.ROTA_RELATORIOS.obterRota(), component: ReportsComponent},
            {path: MapeamentoRota.ROTA_CONFIGURACOES.obterRota(), component: SettingsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrgaoResponsavelRoutingModule {
}
