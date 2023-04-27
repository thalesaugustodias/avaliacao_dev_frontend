import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContasService } from '../services/contas.service';
import { Response } from 'app/shared/models/Response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss']
})
export class ContasComponent implements OnInit {
  
  public contasList: any;

  constructor(private contasService: ContasService) { }

  ngOnInit(): void {
    this.getAll();
  } 

  private getAll(): void {
    this.contasService.get().subscribe((response: Response) => {
      if (!response.hasErrors) {
        this.contasList = response.collections;
      }
    }, (error) => {
      console.log(error);
    })
  }

  public deleteItem(id:number): void {
    this.contasService.delete(id).subscribe((response: Response) => {
      if (!response.hasErrors) {
        Swal.fire({
          title: 'Atenção',
          text: 'Conta deletada com sucesso.',
          icon: 'success',
          showCancelButton: false
        });        
        this.getAll();
      }
      else {
        Swal.fire({
          title: 'Atenção',
          text: 'Ocorreu um erro ao tentar deletar a conta.\n' + response.message,
          icon: 'warning',
          showCancelButton: false
        });
      }
    }, (error) => {
      Swal.fire({
        title: 'Atenção',
        text: 'Ocorreu um erro ao deletar a conta.\n' + error.message,
        icon: 'error',
        showCancelButton: false
      });
      console.log(error);
    })
  }  
}
