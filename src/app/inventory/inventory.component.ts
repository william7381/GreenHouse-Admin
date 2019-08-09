import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Constants} from '../other/Constants';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchTerm: any;
  itemsTable = new MatTableDataSource();

  constants = Constants;

  message1: any;
  message2: any;
  message3: any;
  message4: any;
  input1: any = 'a';
  input2: any = 'a';
  input3: any = '3';

  isLoadingTable = false;

  displayedColumns: string[] = ['po', 'no', 'de', 'st', 'fe', 'pro', 'op'];

  providers: any[];

  selectedEdit;

  textTitle;
  input1Last: any;

  constructor(private myHttp: HttpClientService) {
    this.updateTable();
    this.myHttp.get('/proveedores').subscribe(
      data => {
        // @ts-ignore
        this.providers = data;
      }
    );
  }

  updateTable() {
    this.itemsTable.data = [];
    this.isLoadingTable = true;
    this.myHttp.get('/ingredientes').subscribe(
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
  write2() {
    const value = this.input2;
    if (!value) {
      this.message2 = Constants.fieldVoid;
      return false;
    }
    this.message2 = '';
    return true;
  }
  write3() {
    this.input3 = Constants.removeSpaces(this.input3);
    const value = this.input3;
    if (!value) {
      this.message3 = Constants.fieldVoid;
      return false;
    }
    if (!Number.isNaN(value) && !Number.isInteger(+value)) {
      this.message3 = Constants.inNotInteger;
      return false;
    }
    if ((+value) < 0) {
      this.message2 = Constants.inNotMinorZero;
      return false;
    }
    this.message3 = '';
    return true;
    // var dblVar = parseFloat(strVar);
    // if (isNaN(dblVar)) {
    //   alert("error");
    // }
  }
  write4() {
    const value = this.providers;
    if (!value || value.length === 0) {
      this.message4 = Constants.chooseProvider;
      return false;
    }
    this.message4 = '';
    return true;
  }

  getItem() {
    const s1 = document.getElementById('select1');
    let id1 = -1;
    if (this.selectedEdit) {
      id1 = this.selectedEdit.id;
    }
    return {
      id: id1,
      nombre: this.input1,
      descripcion: this.input2,
      stock: +this.input3,
      // fechaIngreso: Constants.getFormatDate(new Date()),
      // @ts-ignore
      proveedor: this.providers[s1.selectedIndex],
    };
  }

  validate() {
    const w1 = this.write1();
    // const w2 = this.write2();
    const w3 = this.write3();
    const w4 = this.write4();
    return !w1 || !w3 || !w4;
  }

  save() {
    if (this.validate()) {
      return;
    }
    const item = this.getItem();
    if (this.selectedEdit) {
      const numberSend = (this.input1Last + '').toUpperCase() === (this.input1 + '').toUpperCase() ? 0 : 1;
      this.myHttp.put('/ingrediente/' + numberSend, item).subscribe(
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
      this.myHttp.post('/ingrediente', item).subscribe(
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
    this.input1 = this.input1Last = this.selectedEdit.nombre;
    this.input2 = this.selectedEdit.descripcion;
    this.input3 = this.selectedEdit.stock;
    const s1 = document.getElementById('select1');
    // @ts-ignore
    s1.selectedIndex = this.searchIndexOption(this.providers, this.selectedEdit.proveedor);
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
    this.input2 = '';
    this.input3 = '';
    const s1 = document.getElementById('select1');
    // @ts-ignore
    s1.selectedIndex = 0;
  }

  private search(value: string) {
    this.itemsTable.filter = value.trim().toLowerCase();
  }

  removeElement(element: any) {
    if (confirm(Constants.remove)) {
      this.myHttp.delete('/ingrediente/' + element.id).subscribe(
        data => {
          this.updateTable();
        }
      );
    }
  }

  saveElement() {
    this.selectedEdit = undefined;
    this.textTitle = 'Agregar Ingrediente';
    this.printCreate();
    this.clearFieldError();
  }

  editElement(element: any) {
    this.selectedEdit = element;
    this.textTitle = 'Editar Ingrediente';
    this.printEdit();
    this.clearFieldError();
  }

  private clearFieldError() {
    this.message1 = this.message2 = this.message3 = this.message4 = '';
  }

  ngAfterViewInit(): void {
    this.itemsTable.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = Constants.ITEMS_TABLE_INVENTORY;
  }
}
