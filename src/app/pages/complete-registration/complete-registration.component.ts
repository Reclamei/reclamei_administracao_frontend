import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {PrimengFactory} from 'src/app/shared/factories/primeng.factory';
import {ErrorType} from 'src/app/shared/auth/model/error-type.enum';
import {AuthService} from 'src/app/shared/auth/auth.service';
import {Subscription} from 'rxjs';
import {CompanyService} from '../../shared/services/company.service';
import {HeadService} from '../../shared/services/head.service';

@Component({
    selector: 'app-complete-registration',
    templateUrl: './complete-registration.component.html',
    styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent implements OnInit {
    public registrationForm: FormGroup;
    public isValidEmailLink: boolean;
    public externalId: string;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private headService: HeadService
    ) {
        this.registrationForm = this.initializeForm();
    }

    async ngOnInit(): Promise<void> {
        await this.checkEmailLink();
        await this.checkQueryParams();
        await this.checkExternalId();
    }

    public async register(): Promise<void> {
        await this.createUser();
        await this.updateUserProfile();
        await this.confirmUser();
    }

    private async createUser(): Promise<void> {
        return this.authService
            .createUserWithEmailAndPassword(this.registrationForm.get('email').value,  this.registrationForm.get('password').value)
            .then((userCredential) => {
                sessionStorage.setItem('user', JSON.stringify(userCredential.user));
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
    }

    private async confirmUser(): Promise<Subscription> {
        return this.headService.confirmUser(this.externalId).subscribe({
            next: (res) => this.redirectHomepage(),
            error: (error) => {
                sessionStorage.setItem('user', JSON.stringify(null));
                PrimengFactory.mensagemErro(this.messageService, 'Erro ao confirmar usuário', ErrorType.getMessage(error.code));
            }
        });
    }

    private initializeForm(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
            passwordRepeat: new FormControl(null, [Validators.required])
        });
    }

    private async checkEmailLink(): Promise<void> {
        return this.authService.isSignInWithEmailLink()
            .then((emailLink) => {
                this.isValidEmailLink = emailLink;
                if (!emailLink) {
                    this.redirectAuthenticationPage();
                }
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na validação do link de e-mail',
                ErrorType.getMessage(error.code)));
    }

    private redirectAuthenticationPage(): void {
        this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
    }

    private redirectHomepage(): void {
        this.router.navigateByUrl(MapeamentoRota.ROTA_PAINEL_ADMINISTRATIVO.obterCaminhoRota());
    }

    private async checkQueryParams(): Promise<Subscription> {
        return this.route.queryParams.subscribe(params => {
            this.externalId = params.hash;
            if (this.externalId == null) {
                this.redirectAuthenticationPage();
            }
        });
    }

    private async checkExternalId(): Promise<Subscription> {
        return this.companyService.getCompanyByHeadExternalId(this.externalId).subscribe({
            next: (company) => {
                this.registrationForm.patchValue({
                    cnpj: company.cnpj,
                    email: company.email
                });
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code))
        });
    }

    private async updateUserProfile() {
        const user = await this.authService.getCurrentUser();
        if (user) {
            await user.updateProfile({
                displayName: this.externalId.toString(),
            });
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            throw new Error('Usuário não autenticado');
        }
    }
}
