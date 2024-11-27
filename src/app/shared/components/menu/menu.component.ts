import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CompanyModel} from '../../models/aplicacao/company.model';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MapeamentoRota} from '../../constants/mapeamento-rota';
import {PrimengFactory} from '../../factories/primeng.factory';
import {AuthService} from '../../auth/auth.service';
import {CachedService} from '../../services/cached.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    public company: CompanyModel = new CompanyModel();
    public opcoes: MenuItem[] = this.inicializarOpcoesMenu();
    @Input() public esconderMenuMobile = true;
    @Output() public aoEsconderMenu: EventEmitter<void> = new EventEmitter();

    constructor(
        private cachedService: CachedService,
        private router: Router,
        private messageService: MessageService,
        private authService: AuthService
    ) {
        this.cachedService.getCompany()
            .then(company => {
                this.company = company;
                this.company.localImage = '/assets/images/representative/orgaos/aaa.png';
                this.checkUserAdmin();
            });
    }

    public selecionarOpcao(opcao: MenuItem): void {
        if (!opcao.disabled) {
            opcao.command();
        }
    }

    public inicializarOpcoesMenu(): MenuItem[] {
        return [
            {
                icon: 'pi pi-home',
                label: 'Início',
                command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_PAINEL_ADMINISTRATIVO.obterCaminhoRota())
            },
            {
                icon: 'pi pi-exclamation-triangle',
                label: 'Reclamações',
                command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_RECLAMACOES.obterCaminhoRota())
            },
            {
                icon: 'pi pi-map-marker',
                label: 'Abrangência',
                command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_ABRANGENCIA.obterCaminhoRota())
            },
            {
                icon: 'pi pi-chart-bar',
                label: 'Relatórios',
                command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_RELATORIOS.obterCaminhoRota())
            },
            {
                icon: 'pi pi-sliders-v',
                label: 'Configurações',
                command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_CONFIGURACOES.obterCaminhoRota())
            },
            {icon: 'pi pi-sign-out', label: 'Sair', command: () => this.deslogar()},
        ];
    }

    private deslogar(): void {
        this.authService
            .signOut()
            .catch((error) => PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', error.message));
        this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
    }

    private async checkUserAdmin() {
        const user = await this.authService.getCurrentUser();
        if (!!user && user.email === 'admin@admin.com') {
            this.opcoes = [
                {
                    icon: 'pi pi-home',
                    label: 'Início',
                    command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_PAINEL_ADMINISTRATIVO_SYSTEM_ADMIN.obterCaminhoRota())
                },
                {
                    icon: 'pi pi-chart-bar',
                    label: 'Aprovações',
                    command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_APROVACOES_SYSTEM_ADMIN.obterCaminhoRota())
                },
                {
                    icon: 'pi pi-briefcase',
                    label: 'Tipos de serviço',
                    command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_TIPOS_SERVICO_SYSTEM_ADMIN.obterCaminhoRota())
                },
                {
                    icon: 'pi pi-globe',
                    label: 'Localidades',
                    command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_LOCALIDADES_SYSTEM_ADMIN.obterCaminhoRota())
                },
                {
                    icon: 'pi pi-building',
                    label: 'Órgãos',
                    command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_EMPRESAS_SYSTEM_ADMIN.obterCaminhoRota())
                },
                {
                    icon: 'pi pi-sliders-v',
                    label: 'Abrangência',
                    command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_CONFIGURACOES_SYSTEM_ADMIN.obterCaminhoRota())
                },
                {icon: 'pi pi-sign-out', label: 'Sair', command: () => this.deslogar()},
            ];
        }
    }
}
