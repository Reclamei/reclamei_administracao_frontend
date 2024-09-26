export class LoginModel {
    constructor(
        private email: string,
        private senha: string
    ) {}

    public getEmail(): string {
        return this.email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public static criarDeObjeto(objeto: Record<string, any>): LoginModel {
        return new LoginModel(objeto['email'], objeto['senha']);
    }
}
