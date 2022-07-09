import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TreinosService } from '../treinos.service';

export class Treinos {
  id!: number;
  exercicio!: string;
  descricao!: string;
}

@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.component.html',
  styleUrls: ['./treinos.component.css']
})
export class TreinosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'exercicio', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Treinos>();

  constructor(private service: TreinosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getTreinoss().subscribe(treinoss => this.dataSource.data = treinoss);
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(MngTreinosDialog, {
      width: '750px',
      data: new Treinos()
    });

    dialogRef.afterClosed().subscribe(treinos => {
      this.service.adicionar(treinos).subscribe(treinosId => {
          this.service.getTreinos(treinosId).subscribe(newTreinos => {
            this.dataSource.data = this.dataSource.data.concat(newTreinos);
          });
      });
    })
  }

  openEditDialog(treinos: Treinos): void {
    const dialogRef = this.dialog.open(MngTreinosDialog, {
      width: '750px',
      data: treinos
    });

    dialogRef.afterClosed().subscribe(treinos => {
      this.service.editar(treinos).subscribe(_ => {
          this.dataSource.data = this.dataSource.data.map(oldTreinos => {
            if (oldTreinos.id == treinos.id) return treinos;
          })
      });
    })
  }

  excluir(treinos: Treinos): void {
    this.service.remover(treinos.id).subscribe(_ => {
      this.dataSource.data =this.dataSource.data.filter(oldTreinos => oldTreinos.id != treinos.id);
    })
  }
}

@Component({
  selector: 'dialog-mng-treinos',
  templateUrl: 'dialog-mng-treinos.html'
})
export class MngTreinosDialog {

  constructor(public dialogRef: MatDialogRef<MngTreinosDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: Treinos) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}