import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApprovalsComponent} from './pages/approvals/approvals.component';
import {SystemSettingsComponent} from './pages/settings/system-settings.component';
import {SharedModule} from '../../shared/shared.module';
import {SystemAdminRoutingModule} from './system-admin-routing.module';
import {ServiceTypesComponent} from './pages/service-types/service-types.component';
import {LocationComponent} from './pages/location/location.component';
import {CompaniesComponent} from './pages/companies/companies.component';

@NgModule({
    declarations: [
        ApprovalsComponent,
        SystemSettingsComponent,
        ServiceTypesComponent,
        LocationComponent,
        CompaniesComponent
    ],
    imports: [
        CommonModule,
        SystemAdminRoutingModule,
        SharedModule
    ]
})
export class SystemAdminModule { }
