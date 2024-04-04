import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {PrimengFactory} from 'src/app/shared/factories/primeng.factory';
import {ErrorType} from 'src/app/shared/auth/model/error-type.enum';
import {AuthService} from 'src/app/shared/auth/auth.service';
import {map, take, tap} from 'rxjs/operators';

@Component({
    selector: 'app-registrar',
    templateUrl: './registrar.component.html',
    styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
    public readonly modosAutenticacao: ModoAutenticacao = new ModoAutenticacao();
    public readonly steps: StepRegistro = new StepRegistro();
    @Input() public modoAutenticacao: number = this.modosAutenticacao.MODO_ENTRAR;
    @Output() modoAlterado = new EventEmitter<number>();
    public formularioRegistro: FormGroup;
    public step: number = this.steps.INFORMAR_CNPJ;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) {
        this.formularioRegistro = this.inicializarFormulario();
    }

    public ngOnInit(): void {
        this.verificarUsuarioLogado();
    }

    public validarRegistro() {
        if (this.formularioRegistro.value.acessoEmail) {
            const actionCodeSettings = {
                url: 'http://localhost:4200/finalizar-cadastro',
                handleCodeInApp: true
            };
            this.authService
                .sendSignInLinkToEmail(this.formularioRegistro.value.email, actionCodeSettings)
                .then(() => {
                    window.localStorage.setItem('emailForSignIn', this.formularioRegistro.value.email);
                    window.localStorage.setItem('cnpjForSignIn', this.formularioRegistro.value.cnpj);
                    this.step = this.steps.VALIDACAO_ANDAMENTO;
                })
                .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
        } else {
            this.step = this.steps.VALIDACAO_ANDAMENTO;
        }
    }

    private inicializarFormulario(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(null, [Validators.required]),
            nome: new FormControl(121, []),
            site: new FormControl(null, []),
            email: new FormControl('liviaaurich2@gmail.com', []),
            acessoEmail: new FormControl(true, []),
            emailSecundario: new FormControl('teste@gmail.com', [Validators.required])
        });
    }

    private verificarUsuarioLogado(): void {
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

class ModoAutenticacao {
    public readonly MODO_ENTRAR: number = 0;
    public readonly MODO_REGISTRAR: number = 1;
    public readonly MODO_ESQUECEU_SENHA: number = 2;
}

class StepRegistro {
    public readonly INFORMAR_CNPJ: number = 0;
    public readonly VALIDAR_INFORMACOES: number = 1;
    public readonly CONFIRMAR_EMAIL: number = 2;
    public readonly VALIDACAO_ANDAMENTO: number = 3;
}
