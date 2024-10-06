export class StatusReclamationEnum {

    public static readonly OPEN: StatusReclamationEnum = new StatusReclamationEnum('OPEN', 'Em aberto');
    public static readonly REJECTED: StatusReclamationEnum = new StatusReclamationEnum('REJECTED', 'Rejeitada');
    public static readonly IN_ANALYSIS: StatusReclamationEnum = new StatusReclamationEnum('IN_ANALYSIS', 'Em análise');
    public static readonly UNIDENTIFIED: StatusReclamationEnum = new StatusReclamationEnum('UNIDENTIFIED', 'Não identificada');
    public static readonly NO_FORECAST: StatusReclamationEnum = new StatusReclamationEnum('NO_FORECAST', 'Sem previsão');
    public static readonly FORECAST: StatusReclamationEnum = new StatusReclamationEnum('FORECAST', 'Com previsão');
    public static readonly RESOLVED: StatusReclamationEnum = new StatusReclamationEnum('RESOLVED', 'Resolvida');

    private constructor(
        private id: string,
        private descricao: string
    ) {
    }

    public static getAllStatus(): StatusReclamationEnum[] {
        return [
            StatusReclamationEnum.OPEN,
            StatusReclamationEnum.REJECTED,
            StatusReclamationEnum.IN_ANALYSIS,
            StatusReclamationEnum.UNIDENTIFIED,
            StatusReclamationEnum.NO_FORECAST,
            StatusReclamationEnum.FORECAST,
            StatusReclamationEnum.REJECTED,
            StatusReclamationEnum.RESOLVED,
        ];
    }

    public getId(): string {
        return this.id;
    }

    public getDescricao(): string {
        return this.descricao;
    }

}
