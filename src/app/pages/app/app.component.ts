import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { MapeamentoRota } from 'src/app/shared/constants/mapeamento-rota';
import { AuthService } from 'src/app/shared/services/auth.service';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    firebaseConfig = {
        apiKey: "AIzaSyD1mGeGUP1pB_ie5pbkkgqez1f2614sUXI",
        authDomain: "reclamei-auth.firebaseapp.com",
        projectId: "reclamei-auth",
        storageBucket: "reclamei-auth.appspot.com",
        messagingSenderId: "931498777244",
        appId: "1:931498777244:web:1441eaad23accb9cf5ab59",
        measurementId: "G-T25QTFJB3B"
    };

    app = initializeApp(this.firebaseConfig)

    constructor(
        private primengConfig: PrimeNGConfig,
        private authService: AuthService,
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.primengConfig.ripple = true;
        if(!this.authService.estaLogado()) {
            this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
        }
    }
}
