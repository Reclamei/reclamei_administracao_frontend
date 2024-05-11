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
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public companyForm: FormGroup;
    public company: CompanyModel = new CompanyModel();
    public isUserAdmin = true;
    public clonedHeads: { [s: number]: HeadModel } = {};

    public senhaAtual = '';
    public newPassword = '';
    public repetirSenha = '';

    ngOnInit(): void {
        this.company = this.companyService.obterOrgao();
        this.checkLoggedInUser();
        // this.getCompanyById(1);
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService,
        private companyService: CompanyService
    ) {
        this.company = this.companyService.obterOrgao();
        this.companyForm = this.initializeForm();
        // this.getCompanyById(1);
    }

    public getCompanyById(id: number) {
        this.companyService.getCompanyById(id).subscribe({
            next: (company) => {
                this.company = company;
            },
            error: (error) => PrimengFactory.mensagemErro(this.messageService, 'Erro na obtenção dos dados',
                ErrorType.getMessage(error.code))
        });
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

    private initializeForm(): FormGroup {
        return this.formBuilder.group({
            cnpj: new FormControl(this.company.cnpj, [Validators.required]),
            name: new FormControl(this.company.name, [Validators.required]),
            email: new FormControl(this.company.email, [Validators.required, Validators.email]),
            site: new FormControl(this.company.site, []),
            phone: new FormControl(this.company.phone, []),
            sacPhone: new FormControl(this.company.sacPhone, [Validators.required]),
            description: new FormControl(this.company.description, [Validators.required])
        });
    }

    private checkLoggedInUser(): void {
        this.authService.getAngularFireAuth().authState.pipe(
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

}
