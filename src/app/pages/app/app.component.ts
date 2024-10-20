import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {initializeApp} from 'firebase/app';
import {environment} from 'src/environments/environment';
import {AuthService} from 'src/app/shared/auth/auth.service';
import {map, take, tap} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    app = initializeApp(environment.firebase);

    constructor(
        private primengConfig: PrimeNGConfig,
        private router: Router,
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.authService.getAngularFireAuth().authState.pipe(
            take(1),
            map(user => !!user),
            tap(authenticated => {
                if (!authenticated) {
                    this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());                }
            })
        );
    }

}
