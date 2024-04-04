import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MapeamentoRota} from 'src/app/shared/constants/mapeamento-rota';
import {PrimengFactory} from 'src/app/shared/factories/primeng.factory';
import {ErrorType} from 'src/app/shared/auth/model/error-type.enum';
import {AuthService} from 'src/app/shared/auth/auth.service';

@Component({
    selector: 'app-concluir-cadastro',
    templateUrl: './concluir-cadastro.component.html',
    styleUrls: ['./concluir-cadastro.component.scss']
})
export class ConcluirCadastroComponent implements OnInit {
    public formRegistro: FormGroup;
    public isValidEmailLink: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) {
        this.formRegistro = this.inicializarFormulario();
    }

    public ngOnInit(): void {
        this.verificarEmailLink();
    }

    public registrar(): void {
        this.authService
            .createUserWithEmailAndPassword(this.formRegistro.get('email').value,  this.formRegistro.get('senha').value)
            .then((userCredential) => {
                // Criar no company o registro da company com as informaões do CNPJ vinculado e o responsavel principal
                localStorage.setItem('user', JSON.stringify(userCredential.user));
                this.redirecionarPaginaInicial();
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
    }

    private inicializarFormulario(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            senha: new FormControl(null, [Validators.required]),
            repetirSenha: new FormControl(null, [Validators.required])
        });
    }

    private verificarEmailLink(): void {
        this.formRegistro.get('email').setValue(window.localStorage.getItem('emailForSignIn'));
        this.formRegistro.get('cnpj').setValue(window.localStorage.getItem('cnpjForSignIn'));
        this.authService.isSignInWithEmailLink()
            .then((emailLink) => {
                this.isValidEmailLink = emailLink;
                if (!emailLink) {
                    this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
                }
                window.localStorage.removeItem('emailForSignIn');
                window.localStorage.removeItem('cnpjForSignIn');
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
    }

    private redirecionarPaginaInicial(): void {
        this.router.navigateByUrl(MapeamentoRota.ROTA_PAINEL_ADMINISTRATIVO.obterCaminhoRota());
    }
}
