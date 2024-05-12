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

    async ngOnInit(): Promise<void> {
        this.companyForm = this.initializeForm();
        await this.getCompanyByExternalId();
        this.checkLoggedInUser();
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private companyService: CompanyService
    ) { }

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
        this.clonedHeads[head.id] = { ...head };
    }

    public onRowEditCancel(head: HeadModel, index: number) {
        this.company.heads[index] = this.clonedHeads[head.id];
        delete this.clonedHeads[head.id];
        // salvar no banco
    }

    public removeHead(head: HeadModel) {
        this.company.heads = this.company.heads.filter((val) => val.id !== head.id);
        // remover no banco
    }

    public addHead() {
        this.company.heads.push(new HeadModel());
    }

    public updateCompany() {
        this.companyService.update(this.companyForm.value).subscribe({
            next: () => PrimengFactory.mensagemSucesso(this.messageService, 'Registro atualizado com sucesso.', ''),
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro ao atualizar informações do órgão.',
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
                    this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());                }
            })
        );
    }


    onRowEditSave(head: any) {

    }

    private async getCompanyByExternalId() {
        const user = await this.authService.getCurrentUser();
        if (!user || !user.displayName) {
            throw new Error('Usuário não autenticado');
        }
        return this.companyService.getCompanyByHeadExternalId(user.displayName).subscribe({
            next: (company: CompanyModel) => {
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
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code))
        });
    }

}
