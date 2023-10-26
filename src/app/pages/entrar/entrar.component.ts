import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MapeamentoRota } from 'src/app/shared/constants/mapeamento-rota';
import { PrimengFactory } from 'src/app/shared/factories/primeng.factory';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


@Component({
    selector: 'app-entrar',
    templateUrl: './entrar.component.html',
    styleUrls: ['./entrar.component.scss']
})
export class EntrarComponent implements OnInit {
    public readonly modosAutenticacao: ModoAutenticacao = new ModoAutenticacao();
    public modoAutenticacao: number = this.modosAutenticacao.MODO_ENTRAR;
    public formularioLogin: FormGroup;
    public formularioRegistro: FormGroup;
    public formularioEsqueceuSenha: FormGroup;
    private mapaCriacaoFormulario: Map<number, () => FormGroup>;
    private auth = getAuth();

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private router: Router
    ) {
        this.mapaCriacaoFormulario = new Map();
        this.definifirCriacaoFormularios();
        this.formularioLogin = this.inicializarFormulario(this.modosAutenticacao.MODO_ENTRAR);
        this.formularioRegistro = this.inicializarFormulario(this.modosAutenticacao.MODO_REGISTRAR);
        this.formularioEsqueceuSenha = this.inicializarFormulario(this.modosAutenticacao.MODO_ESQUECEU_SENHA);
    }

    public ngOnInit(): void {
        this.verificarUsuarioLogado();
    }

    public entrar(): void {
        signInWithEmailAndPassword(this.auth, this.formularioLogin.get('email').value, this.formularioLogin.get('senha').value)
            .then((userCredential) => {
                localStorage.setItem('user', JSON.stringify(userCredential.user));
                this.redirecionarPaginaInicial();
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Acesso Negado', error.message));
    }

    public registrar(): void {
        createUserWithEmailAndPassword(this.auth, this.formularioRegistro.get('email').value,  this.formularioRegistro.get('senha').value)
            .then((userCredential) => {
                localStorage.setItem('user', JSON.stringify(userCredential.user));
                this.redirecionarPaginaInicial();
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', error.message));
    }

    public redefinirSenha(): void {
        sendPasswordResetEmail(this.auth, this.formularioEsqueceuSenha.get('senha').value)
            .then(() => {
                this.modoAutenticacao = this.modosAutenticacao.MODO_ENTRAR
            })
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na tentativa de recuperação de senha', error.message));
    }

    private inicializarFormulario(modoAutenticacao: number): FormGroup {
        if(this.mapaCriacaoFormulario.has(modoAutenticacao)) {
            return this.mapaCriacaoFormulario.get(modoAutenticacao)();
        }
        throw new Error('Não foi possível criar formulário, modo de autenticação: ' + modoAutenticacao);
    }

    private definifirCriacaoFormularios(): void {
        this.mapaCriacaoFormulario.set(this.modosAutenticacao.MODO_ENTRAR, () => {
            return this.formBuilder.group({
                email: new FormControl(null, [Validators.required, Validators.email]),
                senha: new FormControl(null, [Validators.required])
            });
        });
        this.mapaCriacaoFormulario.set(this.modosAutenticacao.MODO_REGISTRAR, () => {
            return this.formBuilder.group({
                nome: new FormControl(null, [Validators.required]),
                email: new FormControl(null, [Validators.required, Validators.email]),
                senha: new FormControl(null, [Validators.required]),
                repetirSenha: new FormControl(null, [Validators.required])
            });
        });
        this.mapaCriacaoFormulario.set(this.modosAutenticacao.MODO_ESQUECEU_SENHA, () => 
            this.formBuilder.group({ email: new FormControl(null, [Validators.required, Validators.email])})
        );
    }

    private verificarUsuarioLogado(): void {
        const user = getAuth().currentUser;
        if(!!user) {
            this.redirecionarPaginaInicial();
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    private redirecionarPaginaInicial(): void {
        this.router.navigateByUrl(MapeamentoRota.ROTA_PAINEL_ADMINISTRATIVO.obterCaminhoRota());
    }
}

class ModoAutenticacao {
    public readonly MODO_ENTRAR: number = 0;
    public readonly MODO_REGISTRAR: number = 1;
    public readonly MODO_ESQUECEU_SENHA: number = 2;
}
