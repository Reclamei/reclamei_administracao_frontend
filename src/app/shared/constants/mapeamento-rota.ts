export class MapeamentoRota {
	private static readonly SEPARADOR_CAMINHO: string = '/';
	public static readonly TODAS_AS_ROTAS: MapeamentoRota[] = [];
	public static readonly ROTA_RAIZ: MapeamentoRota = this.registrarRota(null, '');
	public static readonly ROTA_AUTENTICAR: MapeamentoRota = this.registrarRota(this.ROTA_RAIZ, 'autenticar');
	public static readonly ROTA_CONCLUIR_CADASTRO: MapeamentoRota = this.registrarRota(this.ROTA_RAIZ, 'finalizar-cadastro');
	public static readonly ROTA_PAINEL_ADMINISTRATIVO: MapeamentoRota = this.registrarRota(this.ROTA_RAIZ, 'painel-administrativo');
	public static readonly ROTA_RECLAMACOES: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO, 'reclamacoes');
	public static readonly ROTA_ABRANGENCIA: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO, 'abrangencia');
	public static readonly ROTA_RELATORIOS: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO, 'relatorios');
	public static readonly ROTA_CONFIGURACOES: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO, 'configuracoes');

	public static readonly ROTA_PAINEL_ADMINISTRATIVO_SYSTEM_ADMIN: MapeamentoRota = this.registrarRota(this.ROTA_RAIZ, 'painel-administrativo-system-admin');
	public static readonly ROTA_CONFIGURACOES_SYSTEM_ADMIN: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO_SYSTEM_ADMIN, 'configuracoes');
	public static readonly ROTA_APROVACOES_SYSTEM_ADMIN: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO_SYSTEM_ADMIN, 'aprovacoes');
	public static readonly ROTA_TIPOS_SERVICO_SYSTEM_ADMIN: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO_SYSTEM_ADMIN, 'tipos-servico');
	public static readonly ROTA_LOCALIDADES_SYSTEM_ADMIN: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO_SYSTEM_ADMIN, 'localidades');
	public static readonly ROTA_EMPRESAS_SYSTEM_ADMIN: MapeamentoRota = this.registrarRota(this.ROTA_PAINEL_ADMINISTRATIVO_SYSTEM_ADMIN, 'empresas');

	private constructor(private superRota: MapeamentoRota, private rota: string) {}

	private static registrarRota(superRota: MapeamentoRota, rota: string): MapeamentoRota {
		return this.registrarIgnorandoDuplicatas(new MapeamentoRota(superRota, rota));
	}

	private static registrarIgnorandoDuplicatas(rotaParaRegistrar: MapeamentoRota): MapeamentoRota {
		let rotaJaRegistradaEncontrada: MapeamentoRota = this.encontrarRotaDuplicada(rotaParaRegistrar);
		if (!rotaJaRegistradaEncontrada) {
			this.TODAS_AS_ROTAS.push(rotaParaRegistrar);
			rotaJaRegistradaEncontrada = rotaParaRegistrar;
		}
		return rotaJaRegistradaEncontrada;
	}

	private static encontrarRotaDuplicada(rotaTemporaria: MapeamentoRota): MapeamentoRota {
		const caminhoRota: string = rotaTemporaria.obterCaminhoRota();
		return this.TODAS_AS_ROTAS.find((rota: MapeamentoRota) => rota.obterCaminhoRota() === caminhoRota);
	}

	public obterRota(): string {
		return this.rota;
	}

	public obterCaminhoRota(prefixado: boolean = true): string {
		const caminho: string = this.superRota ? this.superRota.obterCaminhoRota(prefixado) : '';
		return caminho + this.prefixarSeparador(this.rota);
	}

	private prefixarSeparador(caminho: string): string {
		return (caminho.length > 0 ? MapeamentoRota.SEPARADOR_CAMINHO : '') + caminho;
	}
}
