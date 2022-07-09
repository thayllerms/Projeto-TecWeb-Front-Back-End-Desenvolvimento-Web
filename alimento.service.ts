import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alimento } from './alimento/alimento.component';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  constructor(private http: HttpClient) { }

  getAlimentos(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>("http://localhost:3000/alimento");
  }

  getAlimento(alimentoId: number): Observable<Alimento> {
    return this.http.get<Alimento>("http://localhost:3000/alimento/" + alimentoId)
  }

  adicionar(alimento: Alimento): Observable<any>{
    return this.http.post("http://localhost:3000/alimento", alimento);
  }

  editar(alimento: Alimento): Observable<any> {
    return this.http.put("http://localhost:3000/alimento/" + alimento.id, alimento)
  }

  remover(alimentoId: number): Observable<any> {
    return this.http.delete("http://localhost:3000/alimento/" + alimentoId);
  }
}
