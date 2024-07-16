import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../orgao-responsavel/pages/home/home.component';
import {DashboardComponent} from '../orgao-responsavel/pages/dashboard/dashboard.component';
import {MapeamentoRota} from '../../shared/constants/mapeamento-rota';
import {SystemSettingsComponent} from './pages/settings/system-settings.component';
import {ApprovalsComponent} from './pages/approvals/approvals.component';
import {ServiceTypesComponent} from './pages/service-types/service-types.component';
import {LocationComponent} from './pages/location/location.component';

const routes: Routes = [
    {path: '', component: HomeComponent, children: [
        { path: '', component: DashboardComponent},
        { path: MapeamentoRota.ROTA_APROVACOES_SYSTEM_ADMIN.obterRota(), component: ApprovalsComponent},
        { path: MapeamentoRota.ROTA_TIPOS_SERVICO_SYSTEM_ADMIN.obterRota(), component: ServiceTypesComponent},
        { path: MapeamentoRota.ROTA_LOCALIDADES_SYSTEM_ADMIN.obterRota(), component: LocationComponent},
        { path: MapeamentoRota.ROTA_CONFIGURACOES_SYSTEM_ADMIN.obterRota(), component: SystemSettingsComponent},
        { path: '**', redirectTo: MapeamentoRota.ROTA_RAIZ.obterRota() },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemAdminRoutingModule {}
