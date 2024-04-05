import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {OrgaoResponsavelRoutingModule} from './orgao-responsavel-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {RelatoriosComponent} from './pages/relatorios/relatorios.component';
import {ReclamacoesComponent} from './pages/reclamacoes/reclamacoes.component';
import {AbrangenciaComponent} from './pages/abrangencia/abrangencia.component';
import {ReclamacoesTableComponent} from './pages/reclamacoes/reclamacoes-table/reclamacoes-table.component';
import {ConfiguracaoComponent} from './pages/configuracao/configuracao.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ReclamacoesComponent,
        ReclamacoesTableComponent,
        RelatoriosComponent,
        AbrangenciaComponent,
        ConfiguracaoComponent
    ],
    imports: [
        CommonModule,
        OrgaoResponsavelRoutingModule,
        SharedModule
    ]
})
export class OrgaoResponsavelModule { }
