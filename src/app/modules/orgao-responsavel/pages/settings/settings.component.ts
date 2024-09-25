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
import {Observable} from 'rxjs';
import {HeadService} from '../../../../shared/services/head.service';
import {CachedService} from '../../../../shared/services/cached.service';
import {BlockUIService} from '../../../../shared/services/block-ui.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public companyForm: FormGroup;
    public company: CompanyModel = new CompanyModel();
    public isUserAdmin = false;
    public clonedHeads: { [s: number]: HeadModel } = {};

    public senhaAtual = '';
    public newPassword = '';
    public repetirSenha = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private companyService: CompanyService,
        private headService: HeadService,
        private cachedService: CachedService,
        private blockUIService: BlockUIService
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.companyForm = this.initializeForm();
        await this.getCompanyByExternalId();
        this.checkLoggedInUser();
    }

    public changePassword() {
        if (this.newPassword !== this.repetirSenha) {
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
            .then(() => PrimengFactory.mensagemSucesso(this.messageService, 'Alteração de senha', 'Senha alterada com sucesso!'))
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao alterar senha', ErrorType.getMessage(error.code)));
    }

    public onRowEditInit(head: HeadModel) {
        this.clonedHeads[head.id] = {...head};
    }

    public onRowEditCancel(head: HeadModel, index: number) {
        this.company.heads[index] = this.clonedHeads[head.id];
        delete this.clonedHeads[head.id];
        // salvar no banco?
    }

    public async removeHead(head: HeadModel) {
        await this.removeAsyncHead(head);
    }

    public addHead() {
        this.company.heads.push(new HeadModel(null, this.companyForm.value.id));
    }

    public updateCompany() {
        this.companyService.update(this.companyForm.value).subscribe({
            next: () => PrimengFactory.mensagemSucesso(this.messageService, 'Registro atualizado com sucesso.', ''),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao atualizar informações do órgão.',
                ErrorType.getMessage(error.code))
        });
    }

    onRowEditSave(head: HeadModel) {
        if (head.id) {
            this.updateHead(head);
            return;
        }
        this.createHead(head);
    }

    private async removeAsyncHead(head: HeadModel) {
        return this.headService.delete(head.id).subscribe({
            next: () => this.company.heads = this.company.heads.filter((val) => val.id !== head.id),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao remover responsável.',
                ErrorType.getMessage(error.code))
        });
    }

    private initializeForm(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(null, [Validators.required]),
            cnpj: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            site: new FormControl(null, []),
            phone: new FormControl(null, []),
            sacPhone: new FormControl(null, [Validators.required]),
            description: new FormControl(null, [Validators.required])
        });
    }

    private checkLoggedInUser(): Observable<boolean> {
        return this.authService.getAngularFireAuth().authState.pipe(
            take(1),
            map(user => !!user),
            tap(authenticated => {
                if (!authenticated) {
                    this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
                }
            })
        );
    }

    private async createHead(head: HeadModel) {
        await this.createAsyncHead(head);
        const actionCodeSettings = {
            url: `http://localhost:4200/finalizar-cadastro?hash=${head.externalId}`,
            handleCodeInApp: true
        };
        await this.authService
            .sendSignInLinkToEmail(head.email, actionCodeSettings)
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', ErrorType.getMessage(error.code)));
        await this.getHeadsByCompany();
    }

    private async createAsyncHead(head: HeadModel) {
        return this.headService.create(head).subscribe({
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao inserir responsável.',
                ErrorType.getMessage(error.code))
        });
    }

    private updateHead(head: HeadModel) {
        this.headService.update(head).subscribe({
            next: () => this.getHeadsByCompany(),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao atualizar informações do responsável.',
                ErrorType.getMessage(error.code))
        });
    }

    private async getCompanyByExternalId() {
        this.blockUIService.block();
        const user = await this.authService.getCurrentUser();
        await this.cachedService.getCompany()
            .then(company => {
                this.company = company;
                this.companyForm.patchValue({
                    id: company.id,
                    cnpj: company.cnpj,
                    name: company.name,
                    email: company.email,
                    site: company.site,
                    phone: company.phone,
                    sacPhone: company.sacPhone,
                    description: company.description,
                });
                this.isUserAdmin = company.heads.find(head => head.externalId === user.displayName).isAdmin === true;
            })
            .catch(error => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code)));
        this.blockUIService.unblock();
    }

    private async getHeadsByCompany() {
        return this.headService.getAllHeadsByCompanyId(this.companyForm.value.id).subscribe({
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao obter responsáveis.',
                ErrorType.getMessage(error.code))
        });
    }
}
