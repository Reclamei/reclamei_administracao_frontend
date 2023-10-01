export class StatusReclamacaoEnum {
    public static readonly RESOLVIDO: StatusReclamacaoEnum = new StatusReclamacaoEnum(1, 'Resolvido');
    public static readonly PENDENTE: StatusReclamacaoEnum = new StatusReclamacaoEnum(2, 'Pendente');
    public static readonly PROMESSA: StatusReclamacaoEnum = new StatusReclamacaoEnum(3, 'Promessa');

    private constructor(
        private id: number,
        private descricao: string
    ) {}

    public getId(): number {
        return this.id;
    }

    public getDescricao(): string {
        return this.descricao;
    }
}
