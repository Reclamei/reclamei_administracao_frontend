import { Component, OnInit } from '@angular/core';
import { CidadeModel } from 'src/app/shared/models/aplicacao/cidade.model';
import { TipoProblemaModel } from 'src/app/shared/models/aplicacao/tipo-problema.model';

type ItemPorcentavel<T> = { item: T, porcentagem: number };

@Component({
    selector: 'app-abrangencia',
    templateUrl: './abrangencia.component.html',
    styleUrls: ['./abrangencia.component.scss']
})
export class AbrangenciaComponent implements OnInit {
    public detalheProblemasVisivel: boolean[] = [true, true];
    public tiposProblema: TipoProblemaModel[] = [
        new TipoProblemaModel('Mal funcionamento do equipamento', 263),
        new TipoProblemaModel('Produto com defeito', 214),
        new TipoProblemaModel('Produto quebrou com pouco tempo de uso', 93),
        new TipoProblemaModel('Outro problema', 68),
        new TipoProblemaModel('Não liga', 30),
    ];
    public maiorTipoProblema: ItemPorcentavel<TipoProblemaModel> = null;
    public cidades: CidadeModel[] = [
        new CidadeModel('Colatina', 259),
        new CidadeModel('Linhares', 105),
        new CidadeModel('Vitória', 29),
        new CidadeModel('São Mateus', 2)
    ];
    public maiorCidade: ItemPorcentavel<CidadeModel> = null;
    public dadosTempoResposta: Record<string, any> = {
        labels: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        datasets: [{
            label: 'Tempo de Resposta',
            data: [18, 0, 58, 24, 26, 34, 66],
            borderColor: '#ff9999',
            backgroundColor: '#ff999955',
        }]
    };
    public centralizarMapa: Record<string, any> = {lat: -19.551675, lng: -40.580482};
    public ampliacaoMapa: number = 6.5;
    public configuracaoMapa: google.maps.MapOptions = this.inicializarConfiguracaoMapa();
    public opcoesMapaCalor: Record<string, any> = {radius: 5};
    public dadosMapaCalor: Record<string, any> = this.gerarLocalizacoesAleatorias(100, this.centralizarMapa.lat, this.centralizarMapa.lng);

    public ngOnInit(): void {
        this.calcularPorcentagens();
    }

    private calcularPorcentagens(): void {
        this.maiorTipoProblema = this.obterMaiorPorcentagem(this.tiposProblema, (tipo: TipoProblemaModel) => tipo.quantidadeReclamacoes);
        this.maiorCidade = this.obterMaiorPorcentagem(this.cidades, (cidade: CidadeModel) => cidade.quantidadeReclamacoes);
    }

    private obterMaiorPorcentagem<T>(itens: T[], obterQuantidade: (item: T) => number): ItemPorcentavel<T> {
        let total: number = 0;
        itens.forEach((item: T) => total += obterQuantidade(item));
        return itens.map((item: T) => ({
            item: item,
            porcentagem: Math.round((obterQuantidade(item) / total) * 10000) / 10000
        })).sort((a, b) => b.porcentagem - a.porcentagem)[0];
    }

    private inicializarConfiguracaoMapa(): google.maps.MapOptions {
        return {
            streetViewControl: false,
            mapTypeControl: false
        };
    }

    private gerarLocalizacoesAleatorias(quantidade: number, latitudeBase: number, longitudeBase: number): Record<string, number>[] {
        let posicoes: Record<string, number>[] = [];
        let adicionarOuRemover = (valor: number) => (valor * ((Math.random() > 0.5) ? 1 : -1));
        while(quantidade > 0) {
            posicoes.push({lat: latitudeBase + adicionarOuRemover(Math.random()), lng: longitudeBase + adicionarOuRemover(Math.random())});
            quantidade--;
        }
        return posicoes;
    }
}
