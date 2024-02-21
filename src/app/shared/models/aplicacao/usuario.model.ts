export class UsuarioModel {
    constructor(
        private username: string,
        private email: string,
        private password: string
    ) { }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }
}
