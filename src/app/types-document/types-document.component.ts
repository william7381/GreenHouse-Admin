import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';
import {Constants} from '../other/Constants';
import * as $ from 'jquery';

@Component({
  selector: 'app-products',
  templateUrl: './types-document.component.html',
  styleUrls: ['./types-document.component.css']
})
export class TypesDocumentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchTerm: any;
  itemsTable = new MatTableDataSource();

  message1: any;
  input1: any = 'a';

  isLoadingTable = false;

  displayedColumns: string[] = ['po', 'no', 'op'];

  providers: any[];

  selectedEdit;

  textTitle;

  constructor(private myHttp: HttpClientService) {
    this.updateTable();
  }

  updateTable() {
    this.itemsTable.data = [];
    this.isLoadingTable = true;
    this.myHttp.get('/documentos').subscribe(
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
      this.myHttp.put('/documento', item).subscribe(
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
      this.myHttp.post('/documento', item).subscribe(
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
    this.input1 = this.selectedEdit.descripcion;
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
    this.input1 = '';
  }

  private search(value: string) {
    this.itemsTable.filter = value.trim().toLowerCase();
  }

  removeElement(element: any) {
    if (confirm(Constants.remove)) {
      this.myHttp.delete('/documento/' + element.id).subscribe(
        data => {
          this.updateTable();
        }
      );
    }
  }

  saveElement() {
    this.selectedEdit = undefined;
    this.textTitle = 'Agregar Tipo de Documento';
    this.printCreate();
    this.clearFieldError();
  }

  editElement(element: any) {
    this.selectedEdit = element;
    this.textTitle = 'Editar Tipo de Documento';
    this.printEdit();
    this.clearFieldError();
  }

  private clearFieldError() {
    this.message1 = '';
  }

  ngAfterViewInit(): void {
    this.itemsTable.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = Constants.ITEMS_TABLE_TYPES_DOCUMENT;
  }
}
