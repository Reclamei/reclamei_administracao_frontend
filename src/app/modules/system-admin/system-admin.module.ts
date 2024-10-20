import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApprovalsComponent} from './pages/approvals/approvals.component';
import {CoveragesComponent} from './pages/coverages/coverages.component';
import {SharedModule} from '../../shared/shared.module';
import {SystemAdminRoutingModule} from './system-admin-routing.module';
import {ServiceTypesComponent} from './pages/service-types/service-types.component';
import {LocationComponent} from './pages/location/location.component';
import {CompaniesComponent} from './pages/companies/companies.component';
import {CnpjPipe} from '../../shared/pipes/cnpj-pipe';
import {DashboardAdminComponent} from './pages/dashboard-admin/dashboard-admin.component';

@NgModule({
    declarations: [
        DashboardAdminComponent,
        ApprovalsComponent,
        CoveragesComponent,
        ServiceTypesComponent,
        LocationComponent,
        CompaniesComponent,
        CnpjPipe
    ],
    imports: [
        CommonModule,
        SystemAdminRoutingModule,
        SharedModule
    ]
})
export class SystemAdminModule { }
