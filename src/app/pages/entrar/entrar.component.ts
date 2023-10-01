import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MapeamentoRota } from 'src/app/shared/constants/mapeamento-rota';
import { PrimengFactory } from 'src/app/shared/factories/primeng.factory';
import { UsuarioModel } from 'src/app/shared/models/aplicacao/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

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

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
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
        this.authService.autenticar(new UsuarioModel(
            '', this.formularioLogin.get('email').value, this.formularioLogin.get('senha').value
        )).subscribe((usuarioLogado: UsuarioModel) => {
            if(usuarioLogado) {
                this.redirecionarPaginaInicial();
            } else {
                PrimengFactory.mensagemErro(this.messageService, 'Acesso Negado', 'Seu e-mail ou senha podem estar errados.');
            }
        });
    }

    public registrar(): void {
        PrimengFactory.mensagemErro(this.messageService, 'Erro!', 'Funcionalidade ainda não implementada.');
    }

    public redefinirSenha(): void {
        PrimengFactory.mensagemErro(this.messageService, 'Erro!', 'Funcionalidade ainda não implementada.');
    }

    private inicializarFormulario(modoAutenticacao: number): FormGroup {
        if(this.mapaCriacaoFormulario.has(modoAutenticacao)) {
            return this.mapaCriacaoFormulario.get(modoAutenticacao)();
        } else {
            throw new Error('Não foi possível criar formulário, modo de autenticação: ' + modoAutenticacao);
        }
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
        this.mapaCriacaoFormulario.set(this.modosAutenticacao.MODO_ESQUECEU_SENHA, () => {
            return this.formBuilder.group({ email: new FormControl(null, [Validators.required, Validators.email]) });
        });
    }

    private verificarUsuarioLogado(): void {
        if(this.authService.estaLogado()) {
            this.redirecionarPaginaInicial();
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
