import { NgModule } from "@angular/core";
import { ANGULAR_IMPORTS } from "./imports/angular.imports";
import { PRIMENG_IMPORTS } from "./imports/primeng.imports";
import { FULLCALENDAR_IMPORTS } from "./imports/fullcalendar.imports";
import { ViewportComponent } from './components/viewport/viewport.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthService } from "./services/auth.service";
import { MessageService } from "primeng/api";
import { AuthGuard } from "./guards/auth.guard";
import { GraficoBarraComponent } from './components/grafico-barra/grafico-barra.component';

const MODULE_PUBLIC: any[] = [
    ViewportComponent,
    TopbarComponent,
    FooterComponent,
    MenuComponent,
    GraficoBarraComponent
];

const MODULE_PRIVATE: any[] = [
];

@NgModule({
    declarations: [
        MODULE_PRIVATE,
        MODULE_PUBLIC
    ],
    imports: [
        ANGULAR_IMPORTS,
        PRIMENG_IMPORTS,
        FULLCALENDAR_IMPORTS
    ],
    exports: [
        MODULE_PUBLIC,
        ANGULAR_IMPORTS,
        PRIMENG_IMPORTS
    ],
    providers: [
        AuthService,
        MessageService,
        AuthGuard
    ]
})
export class SharedModule { }
