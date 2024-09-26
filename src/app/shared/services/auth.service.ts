import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/aplicacao/usuario.model';
import { Observable, Subject } from 'rxjs';
import { LoginModel } from '../models/autenticacao/login.model';
import { RegistroModel } from '../models/autenticacao/registro.model';

@Injectable()
export class AuthService {
    private static usuariosRegistrados: UsuarioModel[] = AuthService.inicializarUsuariosRegistrados();
    private static usuarioLogado: UsuarioModel | null = AuthService.usuariosRegistrados[0];

    constructor() { }

    public autenticar(login: LoginModel): Observable<UsuarioModel | null> {
        let assuntoAutenticacao: Subject<UsuarioModel | null> = new Subject();
        this.interceptarAutenticacao(assuntoAutenticacao.asObservable())
        window.setTimeout(() => {
            assuntoAutenticacao.next(this.encontrarUsuario(new UsuarioModel('', login.getEmail(), login.getSenha())) ?? null);
            assuntoAutenticacao.complete();
        }, 1000);
        return assuntoAutenticacao.asObservable();
    }

    // TODO: este médodo deveria ser assíncrono (o usuário pode não ter sido obtido do back-end ainda durante login)
    public estaLogado(): boolean {
        return !!AuthService.usuarioLogado;
    }

    // TODO: este médodo deveria ser assíncrono (o usuário pode não ter sido obtido do back-end ainda durante login)
    public obterUsuarioLogado(): UsuarioModel | null {
        return AuthService.usuarioLogado;
    }

    public registrar(registro: RegistroModel): Observable<void> {
        let assuntoRegistro: Subject<void> = new Subject();
        window.setTimeout(() => {
            let usuario: UsuarioModel = new UsuarioModel(registro.getNome(), registro.getEmail(), registro.getSenha());
            if(this.encontrarUsuario(usuario)) {
                assuntoRegistro.error('Usuário já registrado.');
            } else {
                AuthService.usuariosRegistrados.push(usuario);
                assuntoRegistro.next();
            }
            assuntoRegistro.complete();
        }, 1000);
        return assuntoRegistro.asObservable();
    }

    public sair(): void {
        AuthService.usuarioLogado = null;
    }

    private encontrarUsuario(usuario: UsuarioModel): UsuarioModel | undefined {
        return AuthService.usuariosRegistrados.find((usuarioProcurado: UsuarioModel) => this.compararUsuario(usuario, usuarioProcurado));
    }

    private interceptarAutenticacao(autenticacao: Observable<UsuarioModel | null>): void {
        autenticacao.subscribe((usuario: UsuarioModel | null) => AuthService.usuarioLogado = usuario);
    }

    private compararUsuario(usuarioA: UsuarioModel, usuarioB: UsuarioModel): boolean {
        return usuarioA.getPassword() == usuarioB.getPassword() && usuarioA.getEmail() == usuarioB.getEmail();
    }

    private static inicializarUsuariosRegistrados(): UsuarioModel[] {
        return [
            new UsuarioModel('livia', 'livia@gmail.com', '123456'),
            new UsuarioModel('gustavo', 'gustavo@gmail.com', '123456')
        ];
    }
}
