export class StatusReclamationEnum {

    public static readonly OPEN: StatusReclamationEnum = new StatusReclamationEnum('OPEN', 'Em aberto');
    public static readonly REJECTED: StatusReclamationEnum = new StatusReclamationEnum('REJECTED', 'Rejeitado');
    public static readonly IN_ANALYSIS: StatusReclamationEnum = new StatusReclamationEnum('IN_ANALYSIS', 'Em análise');
    public static readonly UNIDENTIFIED: StatusReclamationEnum = new StatusReclamationEnum('UNIDENTIFIED', 'Não identificado');
    public static readonly NO_FORECAST: StatusReclamationEnum = new StatusReclamationEnum('NO_FORECAST', 'Sem previsão');
    public static readonly FORECAST: StatusReclamationEnum = new StatusReclamationEnum('FORECAST', 'Com previsão');
    public static readonly RESOLVED: StatusReclamationEnum = new StatusReclamationEnum('RESOLVED', 'Resolvido');

    private constructor(
        private value: string,
        private label: string
    ) {
    }

    public static getAllStatus(): StatusReclamationEnum[] {
        return [
            StatusReclamationEnum.OPEN,
            StatusReclamationEnum.IN_ANALYSIS,
            StatusReclamationEnum.FORECAST,
            StatusReclamationEnum.NO_FORECAST,
            StatusReclamationEnum.RESOLVED,
            StatusReclamationEnum.REJECTED,
            StatusReclamationEnum.UNIDENTIFIED,
        ];
    }

    public getValue(): string {
        return this.value;
    }

}
