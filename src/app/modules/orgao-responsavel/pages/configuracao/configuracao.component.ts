import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/auth/auth.service';
import {map, take, tap} from 'rxjs/operators';
import {MapeamentoRota} from '../../../../shared/constants/mapeamento-rota';
import {CompanyModel} from '../../../../shared/models/aplicacao/company.model';
import {CompanyService} from '../../../../shared/services/company.service';
import {HeadModel} from '../../../../shared/models/aplicacao/head.model';
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
    public orgao: CompanyModel;
    public usuarioAdm = true;
    public clonedResposaveis: { [s: number]: HeadModel } = {};

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
        private orgaoService: CompanyService
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

    public onRowEditInit(responsavel: HeadModel) {
        this.clonedResposaveis[responsavel.id] = { ...responsavel };
    }

    public onRowEditCancel(responsavel: HeadModel, index: number) {
        this.orgao.heads[index] = this.clonedResposaveis[responsavel.id];
        delete this.clonedResposaveis[responsavel.id];
        // salvar no banco
    }

    public removeResponsavel(responsavel: HeadModel) {
        this.orgao.heads = this.orgao.heads.filter((val) => val.id !== responsavel.id);
        // remover no banco
    }

    public addResponsavel() {
        this.orgao.heads.push(new HeadModel());
    }

    private inicializarFormulario(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(this.orgao.cnpj, [Validators.required]),
            nome: new FormControl(this.orgao.name, [Validators.required]),
            email: new FormControl(this.orgao.email, [Validators.required, Validators.email]),
            site: new FormControl(this.orgao.site, []),
            telefone: new FormControl(this.orgao.phone, []),
            telefoneSac: new FormControl(this.orgao.sacPhone, [Validators.required]),
            descricao: new FormControl(this.orgao.description, [Validators.required])
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
