import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dados } from './dados/dados.component';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private http: HttpClient) { }

  getDadoss(): Observable<Dados[]> {
    return this.http.get<Dados[]>("http://localhost:3000/dados");
  }

  getDados(dadosId: number): Observable<Dados> {
    return this.http.get<Dados>("http://localhost:3000/dados/" + dadosId);
  }

  adicionar(dados: Dados): Observable<any> {
    return this.http.post("http://localhost:3000/dados", dados);
  }

  editar(dados: Dados): Observable<any> {
    return this.http.put("http://localhost:3000/dados/" + dados.id, dados)
  }

  remover(dadosId: number): Observable<any> {
    return this.http.delete("http://localhost:3000/dados/" + dadosId);
  }

}
