import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { MapeamentoRota } from 'src/app/shared/constants/mapeamento-rota';
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    app = initializeApp(environment.firebase)

    constructor(
        private primengConfig: PrimeNGConfig,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
    }
}
