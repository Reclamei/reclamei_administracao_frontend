export class RegistroModel {
    constructor(
        private nome: string,
        private email: string,
        private senha: string
    ) {}

    public getNome(): string {
        return this.nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public static criarDeObjeto(objeto: Record<string, any>): RegistroModel {
        return new RegistroModel(objeto['nome'], objeto['email'], objeto['senha']);
    }
}
