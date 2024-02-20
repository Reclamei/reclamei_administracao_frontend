import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HomeComponent } from "./pages/home/home.component";
import { ReclamacoesComponent } from "./pages/reclamacoes/reclamacoes.component";
import { MapeamentoRota } from "src/app/shared/constants/mapeamento-rota";
import { RelatoriosComponent } from "./pages/relatorios/relatorios.component";
import { AbrangenciaComponent } from "./pages/abrangencia/abrangencia.component";

const routes: Routes = [
    {path: '', component: HomeComponent, children: [
        { path: '', component: DashboardComponent},
        { path: MapeamentoRota.ROTA_RECLAMACOES.obterRota(), component: ReclamacoesComponent},
        { path: MapeamentoRota.ROTA_RELATORIOS.obterRota(), component: RelatoriosComponent},
        { path: MapeamentoRota.ROTA_ABRANGENCIA.obterRota(), component: AbrangenciaComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrgaoResponsavelRoutingModule {}
