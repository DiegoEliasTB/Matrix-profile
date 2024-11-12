import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SequenciadorModule } from './components/sequenciador/sequenciador.module';
import { GraficoModule } from './components/grafico/grafico.module';
import { GraficoComponent } from './components/grafico/grafico.component';
import { MatrizProfileService } from './services/matriz-profile.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    SequenciadorModule,
    GraficoModule,
  ],
  providers: [GraficoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  vetorPrincipal: number[] = [];
  private tamanhoSubsequencia: number;
  private casasDecimais: number;

  formulario!: FormGroup;
  formBuilder!: FormBuilder;

  sequenciaFinal: number[] = [];

  constructor(
    private readonly grafico: GraficoComponent,
    private readonly matrizProfileService: MatrizProfileService
  ) {
    this.formBuilder = new FormBuilder();
    this.vetorPrincipal.push(...[0, 1, 3, 2, 9, 1, 14, 15, 1, 2, 2, 10, 7]);
    this.tamanhoSubsequencia = 4;
    this.casasDecimais = 1;
  }

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  getDadosVetor(event: {
    vetor: number[];
    quantidadeSubsequencia: number;
    casasDecimais: number;
  }): void {
    this.sequenciaFinal.length = 0;

    this.vetorPrincipal = event.vetor;
    this.tamanhoSubsequencia = event.quantidadeSubsequencia;
    this.casasDecimais = event.casasDecimais;

    this.sequenciaFinal = this.matrizProfileService.calcularMatrizProfile(
      this.vetorPrincipal,
      this.tamanhoSubsequencia,
      this.casasDecimais
    );

    setTimeout(() => {
      this.grafico.createChart(this.sequenciaFinal);
    });
  }

  private inicializaFormulario(): void {
    this.formulario = this.formBuilder.group({
      vetorPrincipal: [this.vetorPrincipal],
    });
  }
}
