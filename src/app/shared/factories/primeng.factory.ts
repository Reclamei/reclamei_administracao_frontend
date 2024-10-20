import { MessageService } from "primeng/api";

export class PrimengFactory {
    public static readonly SEVERIDADE_SUCESSO: string = 'success';
    public static readonly SEVERIDADE_INFORMACAO: string = 'info';
    public static readonly SEVERIDADE_AVISO: string = 'warn';
    public static readonly SEVERIDADE_ERRO: string = 'error';

    public static mensagemSucesso(messageService: MessageService, titulo: string, detalhe: string): void {
        this.emitirMensagem(messageService, titulo, detalhe, this.SEVERIDADE_SUCESSO);
    }

    public static mensagemInformacao(messageService: MessageService, titulo: string, detalhe: string): void {
        this.emitirMensagem(messageService, titulo, detalhe, this.SEVERIDADE_INFORMACAO);
    }

    public static mensagemAviso(messageService: MessageService, titulo: string, detalhe: string): void {
        this.emitirMensagem(messageService, titulo, detalhe, this.SEVERIDADE_AVISO);
    }

    public static mensagemErro(messageService: MessageService, titulo: string, detalhe: string): void {
        this.emitirMensagem(messageService, titulo, detalhe, this.SEVERIDADE_ERRO);
    }

    public static emitirMensagem(messageService: MessageService, titulo: string, detalhe: string, severidade: string, icone?: string): void {
        messageService.add({severity: severidade, summary: titulo, detail: detalhe, icon: icone });
    }
}
