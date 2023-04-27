import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasCadastrarEditarComponent } from './contas-cadastrar-editar/contas-cadastrar-editar.component';
import { ContaResolverService } from './conta-resolver.service';

const routes: Routes = [
  {
    path: "", component: ContasCadastrarEditarComponent,
    resolve:{
      conta: ContaResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasCadastrarEditarRoutingModule { }
