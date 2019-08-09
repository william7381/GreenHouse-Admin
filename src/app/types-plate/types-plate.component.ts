import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';
import {Constants} from '../other/Constants';
import * as $ from 'jquery';

@Component({
  selector: 'app-products',
  templateUrl: './types-plate.component.html',
  styleUrls: ['./types-plate.component.css']
})
export class TypesPlateComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchTerm: any;
  itemsTable = new MatTableDataSource();

  message1: any;
  input1: any = 'a';

  isLoadingTable = false;

  displayedColumns: string[] = ['po', 'no', 'op'];

  selectedEdit;

  textTitle;
  input1Last: any;

  constructor(private myHttp: HttpClientService) {
    this.updateTable();
  }

  updateTable() {
    this.itemsTable.data = [];
    this.isLoadingTable = true;
    this.myHttp.get('/tiposProducto').subscribe(
      data => {
        // @ts-ignore
        this.itemsTable.data = data;
        this.isLoadingTable = false;
      }
    );
  }

  ngOnInit() {
  }

  write1() {
    this.input1 = Constants.removeSpaces(this.input1);
    const value = this.input1;
    if (!value) {
      this.message1 = Constants.fieldVoid;
      return false;
    }
    this.message1 = '';
    return true;
  }

  getItem() {
    let id1 = -1;
    if (this.selectedEdit) {
      id1 = this.selectedEdit.id;
    }
    return {
      id: id1,
      descripcion: this.input1,
    };
  }

  validate() {
    const w1 = this.write1();
    return !w1;
  }

  save() {
    if (this.validate()) {
      return;
    }
    const item = this.getItem();
    if (this.selectedEdit) {
      const numberSend = (this.input1Last + '').toUpperCase() === (this.input1 + '').toUpperCase() ? 0 : 1;
      this.myHttp.put('/tipoProducto/' + numberSend, item).subscribe(
        data => {
          // @ts-ignore
          if (data.error && data.error === 1) {
            this.message1 = Constants.getErrorOfCode(1).value;
            return;
          }
          this.updateTable();
          $('[data-dismiss=modal]').trigger({ type: 'click' });
        }
      );
    } else {
      this.myHttp.post('/tipoProducto', item).subscribe(
        data => {
          // @ts-ignore
          if (data.error && data.error === 1) {
            this.message1 = Constants.getErrorOfCode(1).value;
            return;
          }
          this.updateTable();
          $('[data-dismiss=modal]').trigger({ type: 'click' });
        }
      );
    }
  }

  printEdit() {
    this.input1 = this.input1Last = this.selectedEdit.descripcion;
  }

  searchIndexOption(typesDocument: any[], tipoDocumento: any) {
    for (let i = 0; i < typesDocument.length; i++) {
      if (typesDocument[i].id === tipoDocumento.id) {
        return i;
      }
    }
    return 0;
  }


  printCreate() {
    this.input1 = this.input1Last = '';
  }

  private search(value: string) {
    this.itemsTable.filter = value.trim().toLowerCase();
  }

  removeElement(element: any) {
    if (confirm(Constants.remove)) {
      this.myHttp.delete('/tipoProducto/' + element.id).subscribe(
        data => {
          this.updateTable();
        }
      );
    }
  }

  saveElement() {
    this.selectedEdit = undefined;
    this.textTitle = 'Agregar Tipo de Plato';
    this.printCreate();
    this.clearFieldError();
  }

  editElement(element: any) {
    this.selectedEdit = element;
    this.textTitle = 'Editar Tipo de Plato';
    this.printEdit();
    this.clearFieldError();
  }

  private clearFieldError() {
    this.message1 = '';
  }

  ngAfterViewInit(): void {
    this.itemsTable.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = Constants.ITEMS_TABLE_TYPES_PLATE;
  }
}
