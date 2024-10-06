import {NgModule} from '@angular/core';
import {ANGULAR_IMPORTS} from './imports/angular.imports';
import {PRIMENG_IMPORTS} from './imports/primeng.imports';
import {FULLCALENDAR_IMPORTS} from './imports/fullcalendar.imports';
import {ViewportComponent} from './components/viewport/viewport.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {MenuComponent} from './components/menu/menu.component';
import {MessageService} from 'primeng/api';
import {GraficoBarraComponent} from './components/grafico-barra/grafico-barra.component';
import {GOOGLE_IMPORTS} from './imports/google.imports';
import {MaxLengthPipe} from './pipes/max-length.pipe';

const MODULE_PUBLIC: any[] = [
    ViewportComponent,
    TopbarComponent,
    FooterComponent,
    MenuComponent,
    GraficoBarraComponent,
    MaxLengthPipe
];

const MODULE_PRIVATE: any[] = [];

@NgModule({
    declarations: [
        MODULE_PRIVATE,
        MODULE_PUBLIC
    ],
    imports: [
        ANGULAR_IMPORTS,
        PRIMENG_IMPORTS,
        FULLCALENDAR_IMPORTS,
        GOOGLE_IMPORTS
    ],
    exports: [
        MODULE_PUBLIC,
        ANGULAR_IMPORTS,
        PRIMENG_IMPORTS,
        GOOGLE_IMPORTS
    ],
    providers: [
        MessageService
    ]
})
export class SharedModule {
}
