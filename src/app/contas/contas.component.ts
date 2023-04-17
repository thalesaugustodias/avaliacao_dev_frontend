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

  public formGroup: FormGroup;
  public contasList: any;

  constructor(private formBuilder: FormBuilder, private contasService: ContasService) {

    this.formGroup = this.formBuilder.group({
      Agencia:  ['', [Validators.required]],
      Numero:   ['', [Validators.required]],
      Saldo:    [0, [Validators.required]],
      Cliente: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.getAll();
  }

  create(objFormValues): void {
    const request = {
      ...objFormValues
    };
    debugger;
    this.contasService.post(request).subscribe((response: Response) => {
      if (!response.hasErrors) {
        Swal.fire({
          title: 'Atenção',
          text: 'Conta adicionada com sucesso.',
          icon: 'success',
          showCancelButton: false
        });
        this.cleanFormInputs();
        this.getAll();
      }
      else {
        Swal.fire({
          title: 'Atenção',
          text: 'Ocorreu um erro ao tentar adicionar a conta.\n' + response.message,
          icon: 'warning',
          showCancelButton: false
        });
      }
    }, (error) => {
      Swal.fire({
        title: 'Atenção',
        text: 'Ocorreu um erro ao tentar adicionar a conta.\n' + error.message,
        icon: 'error',
        showCancelButton: false
      });
      console.log(error);
    }, () => { 
    });
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

  public editItem(conta): void {
    Swal.fire({
        title: 'Atenção',
        text: 'Funcionalidade ainda não implementada',
        icon: 'warning',
        showCancelButton: false
      });
  }

  public deleteItem(conta): void {
    Swal.fire({
        title: 'Atenção',
        text: 'Funcionalidade ainda não implementada',
        icon: 'warning',
        showCancelButton: false
      });
  }
  
  public cleanFormInputs(): void {
    this.formGroup.controls.Agencia.setValue("");
    this.formGroup.controls.Numero.setValue("");
    this.formGroup.controls.Saldo.setValue("");
    this.formGroup.controls.Cliente.setValue("");
  }

}
