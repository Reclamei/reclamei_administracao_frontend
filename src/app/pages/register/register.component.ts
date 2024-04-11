import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {PrimengFactory} from 'src/app/shared/factories/primeng.factory';
import {ErrorType} from 'src/app/shared/auth/model/error-type.enum';
import {AuthService} from 'src/app/shared/auth/auth.service';
import {map, take, tap} from 'rxjs/operators';
import {CompanyService} from '../../shared/services/company.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public readonly authenticationModes: AuthenticationModes = new AuthenticationModes();
    public readonly steps: RegistrationSteps = new RegistrationSteps();
    @Input() public authenticationMode: number = this.authenticationModes.MODO_ENTRAR;
    @Output() modeChanged = new EventEmitter<number>();
    public registrationForm: FormGroup;
    public step: number = this.steps.INFORMAR_CNPJ;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService,
        private companyService: CompanyService
    ) {
        this.registrationForm = this.initializeForm();
    }

    public ngOnInit(): void {
        this.checkLoggedInUser();
    }

    public validateRegistration() {
        if (this.registrationForm.value.acessoEmail) {
            const actionCodeSettings = {
                url: 'http://localhost:4200/finalizar-cadastro',
                handleCodeInApp: true
            };
            this.authService
                .sendSignInLinkToEmail(this.registrationForm.value.email, actionCodeSettings)
                .then(() => {
                    window.localStorage.setItem('emailForSignIn', this.registrationForm.value.email);
                    window.localStorage.setItem('cnpjForSignIn', this.registrationForm.value.cnpj);
                    this.step = this.steps.VALIDACAO_ANDAMENTO;
                })
                .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
        } else {
            this.step = this.steps.VALIDACAO_ANDAMENTO;
        }
    }

    private initializeForm(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(null, [Validators.required]),
            name: new FormControl(null, []),
            site: new FormControl(null, []),
            email: new FormControl(null, []),
            hasEmailAccess: new FormControl(true, []),
            secondaryEmail: new FormControl(null, [])
        });
    }

    private checkLoggedInUser(): void {
        this.authService.getAngularFireAuth().authState.pipe(
            take(1),
            map(user => !!user),
            tap(authenticated => {
                if (!authenticated) {
                    this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());                }
            })
        );
    }

    public getInformationByCnpj() {
        this.companyService.getInformationByCnpj(this.registrationForm.value.cnpj).subscribe({
            next: (company) => {
                this.registrationForm.patchValue({
                    cnpj: company.cnpj,
                    name: company.name,
                    email: company.email
                });
                this.step = this.steps.VALIDAR_INFORMACOES;
            },
            error: (error) =>
                PrimengFactory.mensagemErro(this.messageService, 'Erro ao buscar CNPJ',
                    'Não encontramos os detalhes para o CNPJ informado.')
        });
    }
}

class AuthenticationModes{
    public readonly MODO_ENTRAR: number = 0;
}

class RegistrationSteps{
    public readonly INFORMAR_CNPJ: number = 0;
    public readonly VALIDAR_INFORMACOES: number = 1;
    public readonly CONFIRMAR_EMAIL: number = 2;
    public readonly VALIDACAO_ANDAMENTO: number = 3;
}
