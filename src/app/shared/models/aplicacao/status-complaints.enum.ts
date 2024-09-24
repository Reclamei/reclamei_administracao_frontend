export class StatusComplaintsEnum {
    public static readonly OPEN: StatusComplaintsEnum = new StatusComplaintsEnum('OPEN', 'Em aberto');
    public static readonly REJECTED: StatusComplaintsEnum = new StatusComplaintsEnum('REJECTED', 'Rejeitada');
    public static readonly IN_ANALYSIS: StatusComplaintsEnum = new StatusComplaintsEnum('IN_ANALYSIS', 'Em análise');
    public static readonly UNIDENTIFIED: StatusComplaintsEnum = new StatusComplaintsEnum('UNIDENTIFIED', 'Não identificada');
    public static readonly NO_FORECAST: StatusComplaintsEnum = new StatusComplaintsEnum('NO_FORECAST', 'Sem previsão');
    public static readonly FORECAST: StatusComplaintsEnum = new StatusComplaintsEnum('FORECAST', 'Com previsão');
    public static readonly RESOLVED: StatusComplaintsEnum = new StatusComplaintsEnum('RESOLVED', 'Resolvida');

    private constructor(
        private id: string,
        private descricao: string
    ) {
    }

    public getId(): string {
        return this.id;
    }

    public getDescricao(): string {
        return this.descricao;
    }
}
