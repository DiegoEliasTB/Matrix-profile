import { Component, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico',
  standalone: false,
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.scss',
})
export class GraficoComponent {
  chart: any;

  constructor(private el: ElementRef) {}

  createChart(vetor: number[]) {
    const vetorLinha = vetor.map((it, index) => index + 1);

    Chart.register(...registerables);
    const canvas = this.el.nativeElement.querySelector('#myChart');

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: vetorLinha,
        datasets: [
          {
            label: 'Vizinho mais próximo',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: vetor,
          },
        ],
      },
      options: {},
    });
  }

  destroy() {
    const element = this.el.nativeElement.querySelector(
      '#myChart'
    ) as HTMLElement;

    if (element) {
      element.parentElement?.removeChild(element);
    }
  }
}
