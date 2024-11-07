import { Component, OnInit, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SequenciadorModule } from './components/sequenciador/sequenciador.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, SequenciadorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private vetorPrincipal: number[] = [];
  private tamanhoSubsequencia: number;

  formulario!: FormGroup;
  formBuilder!: FormBuilder;

  sequenciaFinal: number[] = [];

  constructor(private ngZone: NgZone) {
    this.formBuilder = new FormBuilder();
    this.vetorPrincipal.push(...[0, 1, 3, 2, 9, 1, 14, 15, 1, 2, 2, 10, 7]);
    this.tamanhoSubsequencia = 4;
  }

  ngOnInit(): void {
    this.inicializaFormulario();
    //this.iniciarPrograma();
  }

  getDadosVetor(event: {
    vetor: number[];
    quantidadeSubsequencia: number;
  }): void {
    this.sequenciaFinal.length = 0;

    this.vetorPrincipal = event.vetor;
    this.tamanhoSubsequencia = event.quantidadeSubsequencia;

    this.iniciarPrograma();
  }

  private inicializaFormulario(): void {
    this.formulario = this.formBuilder.group({
      vetorPrincipal: [this.vetorPrincipal],
    });
  }

  private iniciarPrograma(): void {
    const quantidadeSubsequencias =
      this.vetorPrincipal.length - this.tamanhoSubsequencia;

    for (let i = 0; i <= quantidadeSubsequencias; i++) {
      const sub = this.vetorPrincipal.slice(i, i + this.tamanhoSubsequencia);
      const valorFinal = this.buscaMenorValorSubsequencia(
        sub,
        quantidadeSubsequencias
      );

      this.sequenciaFinal.push(valorFinal);
    }

    const valorNovo = this.sequenciaFinal;
    this.sequenciaFinal = [...this.sequenciaFinal];
    valorNovo.length = 0;
  }

  private buscaMenorValorSubsequencia(
    subSequenciaPrincipal: number[],
    quantidadeSubsequenciasDisponivel: number
  ): number {
    const conjuntoAposProcessamentoSubsequencia: number[] = [];

    for (let i = 0; i <= quantidadeSubsequenciasDisponivel; i++) {
      const subsequenciaAtual = this.vetorPrincipal.slice(
        i,
        i + this.tamanhoSubsequencia
      );

      const distanciaEuclidiana = this.calcularDistanciaEuclidiana(
        subSequenciaPrincipal,
        subsequenciaAtual
      );

      if (distanciaEuclidiana !== 0) {
        conjuntoAposProcessamentoSubsequencia.push(distanciaEuclidiana);
      }
    }

    const valorFinal = this.obtemMenorValor(
      conjuntoAposProcessamentoSubsequencia
    );

    return valorFinal;
  }

  private obtemMenorValor(conjuntoDistancias: number[]): number {
    if (
      !conjuntoDistancias.length &&
      this.vetorPrincipal.every((it) => it === 0)
    ) {
      return 0;
    }

    return conjuntoDistancias.reduce((min, num) => (num < min ? num : min));
  }

  private calcularDistanciaEuclidiana(
    vetor1: number[],
    vetor2: number[]
  ): number {
    let soma = 0;
    for (let i = 0; i < vetor1.length; i++) {
      soma += (vetor1[i] - vetor2[i]) ** 2;
    }

    return Number(Math.sqrt(soma).toFixed(1));
  }
}
