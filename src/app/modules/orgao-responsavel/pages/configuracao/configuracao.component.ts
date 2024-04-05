import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/auth/auth.service';
import {map, take, tap} from 'rxjs/operators';
import {MapeamentoRota} from '../../../../shared/constants/mapeamento-rota';
import {OrgaoModel} from '../../../../shared/models/aplicacao/orgao.model';
import {OrgaoService} from '../../../../shared/services/orgao.service';
import {ResponsavelModel} from '../../../../shared/models/aplicacao/responsavel.model';
import {PrimengFactory} from '../../../../shared/factories/primeng.factory';
import {ErrorType} from '../../../../shared/auth/model/error-type.enum';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-configuracao',
    templateUrl: './configuracao.component.html',
    styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit {

    public formularioOrgao: FormGroup;
    public orgao: OrgaoModel;
    public usuarioAdm = true;
    public clonedResposaveis: { [s: number]: ResponsavelModel } = {};

    public senhaAtual = '';
    public novaSenha = '';
    public repetirSenha = '';

    ngOnInit(): void {
        this.orgao = this.orgaoService.obterOrgao();
        this.verificarUsuarioLogado();
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private orgaoService: OrgaoService
    ) {
        this.orgao = this.orgaoService.obterOrgao();
        this.formularioOrgao = this.inicializarFormulario();
    }

    public alterarSenha() {
        if (this.novaSenha !== this.repetirSenha) {
            PrimengFactory.mensagemErro(this.messageService, 'Erro ao alterar senha', 'Senhas não coincidem');
            return;
        }
        this.authService.getCurrentUser()
            .then(user => {
                if (user) {
                    return user.updatePassword(this.repetirSenha);
                } else {
                    throw new Error('Usuário não autenticado');
                }
            })
            .then(() => PrimengFactory.mensagemSucesso(this.messageService, 'Alteraão de senha', 'Senha alterada com sucesso!'))
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao alterar senha', ErrorType.getMessage(error.code)));
    }

    public onRowEditInit(responsavel: ResponsavelModel) {
        this.clonedResposaveis[responsavel.codigo] = { ...responsavel };
    }

    public onRowEditCancel(responsavel: ResponsavelModel, index: number) {
        this.orgao.responsaveis[index] = this.clonedResposaveis[responsavel.codigo];
        delete this.clonedResposaveis[responsavel.codigo];
        // salvar no banco
    }

    public removeResponsavel(responsavel: ResponsavelModel) {
        this.orgao.responsaveis = this.orgao.responsaveis.filter((val) => val.codigo !== responsavel.codigo);
        // remover no banco
    }

    public addResponsavel() {
        this.orgao.responsaveis.push(new ResponsavelModel());
    }

    private inicializarFormulario(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(this.orgao.cnpj, [Validators.required]),
            nome: new FormControl(this.orgao.nome, [Validators.required]),
            email: new FormControl(this.orgao.email, [Validators.required, Validators.email]),
            site: new FormControl(this.orgao.site, []),
            telefone: new FormControl(this.orgao.telefone, []),
            telefoneSac: new FormControl(this.orgao.telefoneSac, [Validators.required]),
            descricao: new FormControl(this.orgao.descricao, [Validators.required])
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
