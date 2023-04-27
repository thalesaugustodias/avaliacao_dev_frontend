import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContasCadastrarEditarRoutingModule } from './contas-cadastrar-editar-routing.module';
import { ContasCadastrarEditarComponent } from './contas-cadastrar-editar/contas-cadastrar-editar.component';


@NgModule({
  declarations: [ContasCadastrarEditarComponent],
  imports: [
    CommonModule,
    ContasCadastrarEditarRoutingModule,
    ReactiveFormsModule,
  ]  
})
export class ContasCadastrarEditarModule { }