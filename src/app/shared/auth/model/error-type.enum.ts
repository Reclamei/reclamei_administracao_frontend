export class ErrorType {
    public static readonly USER_NOT_FOUND: ErrorType = new ErrorType('auth/user-not-found', 'O usuário não foi encontrado');
    public static readonly WRONG_PASSWORD: ErrorType = new ErrorType('auth/wrong-password', 'Senha incorreta');
    public static readonly EMAIL_ALREADY_IN_USE: ErrorType = new ErrorType('auth/email-already-in-use', 'O e-mail já está em uso durante o processo de criação de conta');
    public static readonly INVALID_LOGIN_CREDENTIALS: ErrorType = new ErrorType('auth/invalid-login-credentials', 'Credenciais de login inválidas');

    private constructor(
        private code: string,
        private errorMessage: string
    ) {}

    public static getMessage(code: string): string {
        const error = [
            this.USER_NOT_FOUND, 
            this.WRONG_PASSWORD, 
            this.EMAIL_ALREADY_IN_USE, 
            this.INVALID_LOGIN_CREDENTIALS
        ].find(item => item.code === code);
        return !!error ? error.errorMessage : code;
    }

}
