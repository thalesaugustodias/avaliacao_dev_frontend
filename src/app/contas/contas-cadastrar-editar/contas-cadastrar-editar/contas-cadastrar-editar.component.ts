import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasService } from 'app/services/contas.service';
import { Response } from 'app/shared/models/Response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas',
  templateUrl: './contas-cadastrar-editar.component.html',
  styleUrls: ['./contas-cadastrar-editar.component.scss']
})
export class ContasCadastrarEditarComponent implements OnInit {

  public formGroup: FormGroup;
  public contasList: any;
  public contas: Response;

  constructor(
    private formBuilder: FormBuilder,
    private contasService: ContasService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.formGroup = this.formBuilder.group({      
      Agencia: ['', [Validators.required]],
      Numero: ['', [Validators.required]],
      Saldo: [0, [Validators.required]],
      Cliente: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.contas = this.activatedRoute.snapshot.data["conta"];
    this.getAll();
    this.formGroup = this.formBuilder.group({      
      Agencia: [(this.contas && this.contas.collections.agencia) ? this.contas.collections.agencia : "", [Validators.required]],
      Numero: [(this.contas && this.contas.collections.numero) ? this.contas.collections.numero : "", [Validators.required]],
      Saldo: [(this.contas && this.contas.collections.saldo) ? this.contas.collections.saldo : 0, [Validators.required]],
      Cliente: [(this.contas && this.contas.collections.cliente) ? this.contas.collections.cliente : "", [Validators.required]]
    })
  }

  save(objFormValues): void {
    const request = {
      ...objFormValues
    };   

    if (this.contas.collections == null) {
      this.contasService.post(request).subscribe((response: Response) => {
        if (!response.hasErrors) {
          Swal.fire({
            title: 'Atenção',
            text: 'Conta cadastrada com sucesso.',
            icon: 'success',
            showCancelButton: false
          });
          this.cleanFormInputs();
          this.getAll();
          this.router.navigateByUrl("/contas")
        }
        else {
          Swal.fire({
            title: 'Atenção',
            text: 'Ocorreu um erro ao tentar cadastrar a conta.\n' + response.message,
            icon: 'warning',
            showCancelButton: false
          });
        }
      }, (error) => {
        Swal.fire({
          title: 'Atenção',
          text: 'Ocorreu um erro ao tentar cadastrar a conta.\n' + error.message,
          icon: 'error',
          showCancelButton: false
        });
        console.log(error);
      });
    } else {
      this.contasService.update(this.contas.collections.id, request).subscribe(
        contaAtualizada => {         
          Swal.fire({
            title: 'Atenção',
            text: 'Conta atualizada com sucesso.',
            icon: 'success',
            showCancelButton: false
          });
          this.router.navigateByUrl("/contas")
        },
        error => {
          Swal.fire({
            title: 'Atenção',
            text: 'Ocorreu um erro ao tentar atualizar a conta.\n' + error.message,
            icon: 'error',
            showCancelButton: false
          });
        }
      )
    }
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

  public cleanFormInputs(): void {
    this.formGroup.controls.Agencia.setValue("");
    this.formGroup.controls.Numero.setValue("");
    this.formGroup.controls.Saldo.setValue("");
    this.formGroup.controls.Cliente.setValue("");
  }

}
