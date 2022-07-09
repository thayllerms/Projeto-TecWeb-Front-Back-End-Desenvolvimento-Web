import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentoComponent } from './alimento/alimento.component';
import { DadosComponent } from './dados/dados.component';
import { TreinosComponent } from './treinos/treinos.component';

const routes: Routes = [
  {path: 'alimento', component: AlimentoComponent},
  {path: 'treinos', component: TreinosComponent},
  {path: 'dados', component: DadosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
