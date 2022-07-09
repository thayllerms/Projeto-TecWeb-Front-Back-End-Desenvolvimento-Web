import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treinos } from './treinos/treinos.component';

@Injectable({
  providedIn: 'root'
})
export class TreinosService {

  constructor(private http: HttpClient) { }

  getTreinoss(): Observable<Treinos[]> {
    return this.http.get<Treinos[]>("http://localhost:3000/treinos");
  }

  getTreinos(treinosId: number): Observable<Treinos> {
    return this.http.get<Treinos>("http://localhost:3000/treinos/" + treinosId);
  }

  adicionar(treinos: Treinos): Observable<any> {
    return this.http.post("http://localhost:3000/treinos", treinos);
  }

  editar(treinos: Treinos): Observable<any> {
    return this.http.put("http://localhost:3000/treinos/" + treinos.id, treinos)
  }

  remover(treinosId: number): Observable<any> {
    return this.http.delete("http://localhost:3000/treinos/" + treinosId);
  }

}
