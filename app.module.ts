import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AlimentoComponent, MngAlimentoDialog } from './alimento/alimento.component';
import { MngTreinosDialog, TreinosComponent } from './treinos/treinos.component';
import { DadosComponent, MngDadosDialog } from './dados/dados.component';
import { HttpClientModule } from '@angular/common/http'
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    AlimentoComponent,
    TreinosComponent,
    DadosComponent,
    MngAlimentoDialog,
    MngTreinosDialog,
    MngDadosDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NoopAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [
    MngAlimentoDialog,
    MngTreinosDialog,
    MngDadosDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
