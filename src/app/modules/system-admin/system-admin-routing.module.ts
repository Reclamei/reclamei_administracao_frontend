import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../orgao-responsavel/pages/home/home.component';
import {MapeamentoRota} from '../../shared/constants/mapeamento-rota';
import {CoveragesAdminComponent} from './pages/coverages-admin/coverages-admin.component';
import {ApprovalsComponent} from './pages/approvals/approvals.component';
import {ServiceTypesComponent} from './pages/service-types/service-types.component';
import {LocationComponent} from './pages/location/location.component';
import {AuthGuardAdmin} from '../../shared/auth/guard/auth-guard-admin';
import {CompaniesComponent} from './pages/companies/companies.component';
import {DashboardAdminComponent} from './pages/dashboard-admin/dashboard-admin.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            {path: '', component: DashboardAdminComponent, canActivate: [AuthGuardAdmin]},
            {path: MapeamentoRota.ROTA_APROVACOES_SYSTEM_ADMIN.obterRota(), component: ApprovalsComponent, canActivate: [AuthGuardAdmin]},
            {
                path: MapeamentoRota.ROTA_TIPOS_SERVICO_SYSTEM_ADMIN.obterRota(),
                component: ServiceTypesComponent,
                canActivate: [AuthGuardAdmin]
            },
            {path: MapeamentoRota.ROTA_LOCALIDADES_SYSTEM_ADMIN.obterRota(), component: LocationComponent, canActivate: [AuthGuardAdmin]},
            {path: MapeamentoRota.ROTA_EMPRESAS_SYSTEM_ADMIN.obterRota(), component: CompaniesComponent, canActivate: [AuthGuardAdmin]},
            {
                path: MapeamentoRota.ROTA_CONFIGURACOES_SYSTEM_ADMIN.obterRota(),
                component: CoveragesAdminComponent,
                canActivate: [AuthGuardAdmin]
            },
            {path: '**', redirectTo: MapeamentoRota.ROTA_RAIZ.obterRota()},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemAdminRoutingModule {
}
