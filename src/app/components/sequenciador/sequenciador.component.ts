import { Component, ElementRef, output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sequenciador',
  standalone: false,
  templateUrl: './sequenciador.component.html',
  styleUrl: './sequenciador.component.scss',
})
export class SequenciadorComponent {
  onCreateVetor = output<{ vetor: number[]; quantidadeSubsequencia: number }>();

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

    this.onCreateVetor.emit({
      vetor: vetor,
      quantidadeSubsequencia: Number(quantidade.value),
    });
  }

  adicionar() {
    var container = this.getContainer() as HTMLDivElement;

    var inputNumber: HTMLInputElement = this.renderer.createElement('input');
    inputNumber.type = 'number';

    inputNumber.className = 'input-vetor';
    // inputNumber.id = 'input-vetor';
    // inputNumber.name = 'quantity';
    // inputNumber.min = '1';
    // inputNumber.max = '10';
    container.appendChild(inputNumber);
  }

  private getContainer(): HTMLElement {
    const div = this.el.nativeElement.querySelector('.container-input');

    if (!div) {
      throw 'Erro ao buscar div';
    }

    return div;
  }
}
