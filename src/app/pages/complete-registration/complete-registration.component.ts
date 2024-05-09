import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {PrimengFactory} from 'src/app/shared/factories/primeng.factory';
import {ErrorType} from 'src/app/shared/auth/model/error-type.enum';
import {AuthService} from 'src/app/shared/auth/auth.service';

@Component({
    selector: 'app-complete-registration',
    templateUrl: './complete-registration.component.html',
    styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent implements OnInit {
    public registrationForm: FormGroup;
    public isValidEmailLink: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) {
        this.registrationForm = this.initializeForm();
    }

    public ngOnInit(): void {
        this.checkEmailLink();
    }

    public register(): void {
        this.authService
            .createUserWithEmailAndPassword(this.registrationForm.get('email').value,  this.registrationForm.get('senha').value)
            .then((userCredential) => {
                // Criar no company o registro da company com as informaões do CNPJ vinculado e o responsavel principal
                localStorage.setItem('user', JSON.stringify(userCredential.user));
                this.redirectHomepage();
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
    }

    private initializeForm(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
            passwordRepeat: new FormControl(null, [Validators.required])
        });
    }

    private checkEmailLink(): void {
        this.authService.isSignInWithEmailLink()
            .then((emailLink) => {
                this.isValidEmailLink = emailLink;
                if (!emailLink) {
                    this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
                }
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
    }

    private redirectHomepage(): void {
        this.router.navigateByUrl(MapeamentoRota.ROTA_PAINEL_ADMINISTRATIVO.obterCaminhoRota());
    }
}
