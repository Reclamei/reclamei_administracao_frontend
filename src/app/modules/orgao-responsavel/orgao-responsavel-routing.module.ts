import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HomeComponent} from './pages/home/home.component';
import {ComplaintsComponent} from './pages/complaints/complaints.component';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {ReportsComponent} from './pages/reports/reports.component';
import {SettingsComponent} from './pages/settings/settings.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            {path: '', component: DashboardComponent},
            {path: MapeamentoRota.ROTA_RECLAMACOES.obterRota(), component: ComplaintsComponent},
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
