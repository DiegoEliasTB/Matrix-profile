import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatrizProfileService {
  private vetorPrincipal: number[] = [];
  private tamanhoSubsequencia: number = 0;
  private casasDecimais: number = 1;
  private sequenciaFinal: number[] = [];

  constructor() {}

  calcularMatrizProfile(
    vetorPrincipal: number[],
    tamanhoSubsequencia: number,
    casasDecimais: number
  ): number[] {
    this.vetorPrincipal = vetorPrincipal;
    this.tamanhoSubsequencia = tamanhoSubsequencia;
    this.casasDecimais = casasDecimais;

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

    const isTodosValoresZero = this.sequenciaFinal.every((it) => it === 0);
    if (isTodosValoresZero) {
      return [0];
    }

    return this.sequenciaFinal;
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

    return Number(Math.sqrt(soma).toFixed(this.casasDecimais));
  }
}
