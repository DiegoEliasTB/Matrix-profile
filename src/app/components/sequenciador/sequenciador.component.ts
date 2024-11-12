import { Component, ElementRef, output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sequenciador',
  standalone: false,
  templateUrl: './sequenciador.component.html',
  styleUrl: './sequenciador.component.scss',
})
export class SequenciadorComponent {
  onCreateVetor = output<{
    vetor: number[];
    quantidadeSubsequencia: number;
    casasDecimais: number;
  }>();

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  emitirDados() {
    const vetor: number[] = [];
    const inputVetorLista = this.el.nativeElement.querySelectorAll(
      '.input-vetor'
    ) as HTMLInputElement[];

    inputVetorLista.forEach((item) => vetor.push(Number(item.value || 0)));

    //TODO fazer via formulário angular
    const quantidade = this.el.nativeElement.querySelector(
      '#quantidadeSubsequencia'
    ) as HTMLInputElement;

    const casasDecimais = this.el.nativeElement.querySelector(
      '#casasDecimais'
    ) as HTMLInputElement;

    this.onCreateVetor.emit({
      vetor: vetor,
      quantidadeSubsequencia: Number(quantidade.value),
      casasDecimais: Number(Number(casasDecimais.value).toFixed(0)),
    });
  }

  limpar() {
    const divInputVetor = this.el.nativeElement.querySelectorAll(
      '.container-input'
    ) as HTMLInputElement;

    const inputVetorLista = this.el.nativeElement.querySelectorAll(
      '.input-vetor'
    ) as HTMLInputElement[];

    inputVetorLista.forEach((input: HTMLElement) => {
      this.renderer.removeChild(divInputVetor, input);
    });

    const inputQuantidadeSubsequencia = this.el.nativeElement.querySelector(
      '#quantidadeSubsequencia'
    ) as HTMLInputElement;

    this.renderer.setProperty(inputQuantidadeSubsequencia, 'value', 1);

    const inputCasasDecimais = this.el.nativeElement.querySelector(
      '#casasDecimais'
    ) as HTMLInputElement;

    this.renderer.setProperty(inputCasasDecimais, 'value', 1);

    this.adicionar();
  }

  adicionar() {
    var container = this.getContainer() as HTMLDivElement;

    var inputNumber: HTMLInputElement = this.renderer.createElement('input');
    inputNumber.type = 'number';

    inputNumber.className = 'input-vetor';
    container.appendChild(inputNumber);
  }

  criarInputQuantidadeSubsequencia(divPai: HTMLInputElement) {
    var inputNumber: HTMLInputElement = this.renderer.createElement('input');
    inputNumber.type = 'number';

    inputNumber.className = 'input-vetor';
    inputNumber.id = 'quantidadeSubsequencia';
    inputNumber.className = 'quantidadeSubsequencia';
    inputNumber.value = '1';

    divPai.appendChild(inputNumber);
  }

  private getContainer(): HTMLElement {
    const div = this.el.nativeElement.querySelector('.container-input');

    if (!div) {
      throw 'Erro ao buscar div';
    }

    return div;
  }
}
