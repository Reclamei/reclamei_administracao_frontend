import { Component, Input, EventEmitter, Output } from '@angular/core';
import { OrgaoModel } from '../../models/aplicacao/orgao.model';
import { OrgaoService } from '../../services/orgao.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MapeamentoRota } from '../../constants/mapeamento-rota';
import { PrimengFactory } from '../../factories/primeng.factory';
import { getAuth, signOut   } from "firebase/auth";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    public orgao: OrgaoModel | null = null;
    public opcoes: MenuItem[] = this.inicializarOpcoesMenu();
    @Input() public esconderMenuMobile: boolean = true;
    @Output() public aoEsconderMenu: EventEmitter<void> = new EventEmitter();

    constructor(
        private orgaoService: OrgaoService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.orgao = this.orgaoService.obterOrgao();
    }

    public selecionarOpcao(opcao: MenuItem): void {
        if(!opcao.disabled) {
            opcao.command();
        }
    }

    private deslogar(): void {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem('user');
        }).catch((error) => {
            PrimengFactory.mensagemErro(this.messageService, 'Erro no registro', error.message);
        });
        this.router.navigateByUrl(MapeamentoRota.ROTA_AUTENTICAR.obterCaminhoRota());
    }

    public inicializarOpcoesMenu(): MenuItem[] {
        return [
            { icon: 'pi pi-home', label: 'Início', command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_PAINEL_ADMINISTRATIVO.obterCaminhoRota()) },
            { icon: 'pi pi-exclamation-triangle', label: 'Reclamações', command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_RECLAMACOES.obterCaminhoRota()) },
            { icon: 'pi pi-map-marker', label: 'Abrangência', command: () => PrimengFactory.mensagemErro(this.messageService, 'Erro!', 'Funcionalidade não implementada.') },
            { icon: 'pi pi-chart-bar', label: 'Relatórios', command: () => this.router.navigateByUrl(MapeamentoRota.ROTA_RELATORIOS.obterCaminhoRota()) },
            { icon: 'pi pi-sliders-v', label: 'Configurações', command: () => PrimengFactory.mensagemErro(this.messageService, 'Erro!', 'Funcionalidade não implementada.') },
            { icon: 'pi pi-sign-out', label: 'Sair', command: () => this.deslogar() },
        ];
    }
}
