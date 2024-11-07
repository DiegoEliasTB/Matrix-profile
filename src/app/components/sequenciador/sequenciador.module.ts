import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenciadorComponent } from './sequenciador.component';

@NgModule({
  declarations: [SequenciadorComponent],
  imports: [CommonModule],
  exports: [SequenciadorComponent],
})
export class SequenciadorModule {}
