import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {PrimengFactory} from 'src/app/shared/factories/primeng.factory';
import {ErrorType} from 'src/app/shared/auth/model/error-type.enum';
import {AuthService} from 'src/app/shared/auth/auth.service';
import {finalize, map, take, tap} from 'rxjs/operators';
import {CompanyService} from '../../shared/services/company.service';
import {v4 as uuidv4} from 'uuid';
import {BlockUIService} from '../../shared/services/block-ui.service';
import {firstValueFrom} from 'rxjs';
import {HeadService} from '../../shared/services/head.service';

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
        private companyService: CompanyService,
        private blockUIService: BlockUIService,
        private headService: HeadService
    ) {
        this.registrationForm = this.initializeForm();
    }

    public ngOnInit(): void {
        this.checkLoggedInUser();
    }

    public async validateRegistration() {
        if (this.registrationForm.value.hasEmailAccess) {
            await firstValueFrom(this.companyService.create(this.registrationForm.value));
            this.sendSignInLinkToEmail();
        } else {
            this.blockUIService.block();
            this.registrationForm.value.heads[0].email = this.registrationForm.value.secondaryEmail;
            await firstValueFrom(this.companyService.create(this.registrationForm.value));
            await firstValueFrom(this.headService.requestApproval(this.registrationForm.value.heads[0].externalId));
            this.blockUIService.unblock();
            this.step = this.steps.VALIDACAO_ANDAMENTO;
        }
    }

    public async getInformationByCnpj() {
        this.blockUIService.block();
        this.companyService.findInformationByCnpj(this.registrationForm.value.cnpj)
            .pipe(finalize(() => this.blockUIService.unblock()))
            .subscribe({
                next: (company) => {
                    this.registrationForm.patchValue({
                        cnpj: company.cnpj,
                        name: company.name,
                        email: company.email,
                        description: company.description,
                        phone: company.phone,
                    });
                    this.step = this.steps.VALIDAR_INFORMACOES;
                },
                error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao buscar CNPJ',
                    'Não encontramos os detalhes para o CNPJ informado.')
            });
    }

    private sendSignInLinkToEmail() {
        const hash = this.registrationForm.value.heads[0].externalId;
        const actionCodeSettings = {
            url: `${window.location.origin}/finalizar-cadastro?hash=${hash}`,
            handleCodeInApp: true
        };
        this.authService
            .sendSignInLinkToEmail(this.registrationForm.value.email, actionCodeSettings)
            .then(() => this.step = this.steps.VALIDACAO_ANDAMENTO)
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
    }

    private initializeForm(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(null, [Validators.required]),
            name: new FormControl(null, []),
            site: new FormControl(null, []),
            email: new FormControl('liviaaurich2@gmail.com', []),
            description: new FormControl(null, []),
            phone: new FormControl(null, []),
            hasEmailAccess: new FormControl(true, []),
            secondaryEmail: new FormControl(null, []),
            heads: this.formBuilder.array([{externalId: uuidv4()}])
        });
    }

    private checkLoggedInUser(): void {
        this.authService.getAngularFireAuth().authState.pipe(
            take(1),
            map(user => !!user),
            tap(authenticated => {
                if (!authenticated) {
                    this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
                }
            })
        );
    }
}

class AuthenticationModes {
    public readonly MODO_ENTRAR: number = 0;
}

class RegistrationSteps {
    public readonly INFORMAR_CNPJ: number = 0;
    public readonly VALIDAR_INFORMACOES: number = 1;
    public readonly CONFIRMAR_EMAIL: number = 2;
    public readonly VALIDACAO_ANDAMENTO: number = 3;
}
