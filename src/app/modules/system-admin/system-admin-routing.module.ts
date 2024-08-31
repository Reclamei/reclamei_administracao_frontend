import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../orgao-responsavel/pages/home/home.component';
import {DashboardComponent} from '../orgao-responsavel/pages/dashboard/dashboard.component';
import {MapeamentoRota} from '../../shared/constants/mapeamento-rota';
import {SystemSettingsComponent} from './pages/settings/system-settings.component';
import {ApprovalsComponent} from './pages/approvals/approvals.component';
import {ServiceTypesComponent} from './pages/service-types/service-types.component';
import {LocationComponent} from './pages/location/location.component';
import {AuthGuardAdmin} from '../../shared/auth/guard/auth-guard-admin';
import {CompaniesComponent} from './pages/companies/companies.component';

const routes: Routes = [
    {path: '', component: HomeComponent, children: [
        { path: '', component: DashboardComponent, canActivate: [AuthGuardAdmin]},
        { path: MapeamentoRota.ROTA_APROVACOES_SYSTEM_ADMIN.obterRota(), component: ApprovalsComponent, canActivate: [AuthGuardAdmin]},
        { path: MapeamentoRota.ROTA_TIPOS_SERVICO_SYSTEM_ADMIN.obterRota(), component: ServiceTypesComponent, canActivate: [AuthGuardAdmin]},
        { path: MapeamentoRota.ROTA_LOCALIDADES_SYSTEM_ADMIN.obterRota(), component: LocationComponent, canActivate: [AuthGuardAdmin]},
        { path: MapeamentoRota.ROTA_EMPRESAS_SYSTEM_ADMIN.obterRota(), component: CompaniesComponent, canActivate: [AuthGuardAdmin]},
        { path: MapeamentoRota.ROTA_CONFIGURACOES_SYSTEM_ADMIN.obterRota(), component: SystemSettingsComponent, canActivate: [AuthGuardAdmin]},
        { path: '**', redirectTo: MapeamentoRota.ROTA_RAIZ.obterRota() },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemAdminRoutingModule {}
