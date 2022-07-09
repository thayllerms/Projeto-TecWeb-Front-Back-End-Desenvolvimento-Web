import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DadosService } from '../dados.service';

export class Dados {
  id!: number;
  descricao_pessoal!: string;
}

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'descricao_pessoal', 'acoes'];
  dataSource = new MatTableDataSource<Dados>();

  constructor(private service: DadosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getDadoss().subscribe(dadoss => this.dataSource.data = dadoss);
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(MngDadosDialog, {
      width: '750px',
      data: new Dados()
    });

    dialogRef.afterClosed().subscribe(dados => {
      this.service.adicionar(dados).subscribe(dadosId => {
          this.service.getDados(dadosId).subscribe(newDados => {
            this.dataSource.data = this.dataSource.data.concat(newDados);
          });
      });
    })
  }

  openEditDialog(dados: Dados): void {
    const dialogRef = this.dialog.open(MngDadosDialog, {
      width: '750px',
      data: dados
    });

    dialogRef.afterClosed().subscribe(dados => {
      this.service.editar(dados).subscribe(_ => {
          this.dataSource.data = this.dataSource.data.map(oldDados => {
            if (oldDados.id == dados.id) return dados;
          })
      });
    })
  }

  excluir(dados: Dados): void {
    this.service.remover(dados.id).subscribe(_ => {
      this.dataSource.data = this.dataSource.data.filter(oldDados => oldDados.id != dados.id);
    })
  }

}

@Component({
  selector: 'dialog-mng-dados',
  templateUrl: 'dialog-mng-dados.html'
})
export class MngDadosDialog {
  constructor(public dialogRef: MatDialogRef<MngDadosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Dados) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}