import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlimentoService } from '../alimento.service';

export class Alimento {
  id!: number;
  marca!: string;
  tabNutritional!: string;
  status = "available";
}

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styleUrls: ['./alimento.component.css']
})
export class AlimentoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'marca', 'tabNutritional', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Alimento>();

  constructor(private service: AlimentoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getAlimentos().subscribe(alimentos => this.dataSource.data = alimentos);
  }

  openNewDialog(): void {
    const dialogRef = this.dialog.open(MngAlimentoDialog, {
      width: '750px',
      data: new Alimento()
    });

    dialogRef.afterClosed().subscribe(alimento => {
      this.service.adicionar(alimento).subscribe(alimentoId => {
        this.service.getAlimento(alimentoId).subscribe(newAlimento => {
          this.dataSource.data = this.dataSource.data.concat(newAlimento);
        });
      });
    });
  }

  openEditDialog(alimento: Alimento): void {
    const dialogRef = this.dialog.open(MngAlimentoDialog, {
      width: '750px',
      data: alimento
    });

    dialogRef.afterClosed().subscribe(alimento => {
      this.service.editar(alimento).subscribe(_ => {
        this.dataSource.data = this.dataSource.data.map(oldAlimento => {
          if(oldAlimento.id == alimento.id) return alimento;
        })
      });
    });
  }

  excluir(alimento: Alimento): void {
    this.service.remover(alimento.id).subscribe((_: any) => {
      this.dataSource.data = this.dataSource.data.filter(oldAlimento => oldAlimento.id != alimento.id)
    });
  }
}

@Component({
  selector: 'dialog-mng-alimento',
  templateUrl: 'dialog-mng-alimento.html'
})
export class MngAlimentoDialog {
  
  constructor(public dialogRef: MatDialogRef<MngAlimentoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Alimento) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}