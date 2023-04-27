import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ContasService } from 'app/services/contas.service';
import { of } from 'rxjs';
import { Response } from 'app/shared/models/Response'

@Injectable({
  providedIn: 'root'
})

export class ContaResolverService implements Resolve<Response>{

  constructor(private contasService: ContasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"];

    if (id) {
      return this.contasService.getById(id);
    }
    return of({} as Response);
  }
}