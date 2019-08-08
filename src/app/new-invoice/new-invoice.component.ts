import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Constants} from '../other/Constants';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchTerm: any;
  itemsTable = new MatTableDataSource();

  constants = Constants;

  message2: any;
  message3: any;
  message4: any;
  message7: any;
  message8: any;
  message9: any;
  input1: any = 'a';
  input2: any = '3';
  // input3: any = '3';
  input7: any = 'a';
  input8: any = '3';
  input9: any = '3';

  isLoadingTable = false;

  displayedColumns: string[] = ['po', 'pt', 'iva', 'ff', 'nc', 'dni', 'te', 'op'];

  typesDocument: any[];
  products: any[];
  productsSelected: any[] = [];

  selectedEdit;

  textTitle;

  constructor(private myHttp: HttpClientService) {
    this.updateTable();
    this.myHttp.get('/documentos').subscribe(
      data => {
        // @ts-ignore
        this.typesDocument = data;
      }
    );
    this.myHttp.get('/platos').subscribe(
      data => {
        // @ts-ignore
        this.products = data;
      }
    );
  }

  updateTable() {
    this.itemsTable.data = [];
    this.isLoadingTable = true;
    this.myHttp.get('/facturas').subscribe(
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
    this.input2 = Constants.removeSpaces(this.input2);
    const value = this.input2;
    if (!value) {
      this.message2 = Constants.fieldVoid;
      return false;
    }
    if (Number.isNaN(parseFloat(value))) {
      this.message2 = Constants.inNotFloat;
      return false;
    }
    if (parseFloat(value) < 0) {
      this.message2 = Constants.inNotMinorZero;
      return false;
    }
    this.message2 = '';
    return true;
  }
  // write2() {
  //   const value = this.input3;
  //   if (!value) {
  //     this.message3 = Constants.fieldVoid;
  //     return false;
  //   }
  //   if (Number.isNaN(parseFloat(value))) {
  //     this.message3 = Constants.inNotFloat;
  //     return false;
  //   }
  //   this.message3 = '';
  //   return true;
  // }
  write4() {
    let value = this.products;
    if (!value || value.length === 0) {
      this.message4 = Constants.productsVoid;
      return false;
    }
    value = this.productsSelected;
    if (!value || value.length === 0) {
      this.message4 = Constants.chooseProducts;
      return false;
    }
    this.message4 = '';
    return true;
  }
  write7() {
    this.input7 = Constants.removeSpaces(this.input7);
    const value = this.input7;
    if (!value) {
      this.message7 = Constants.fieldVoid;
      return false;
    }
    this.message7 = '';
    return true;
  }
  write8() {
    this.input8 = Constants.removeSpaces(this.input8);
    const value = this.input8;
    if (!value) {
      this.message8 = Constants.fieldVoid;
      return false;
    }
    this.message8 = '';
    return true;
  }

  getItem() {
    const s1 = document.getElementById('select1');
    let id1 = -1;
    if (this.selectedEdit) {
      id1 = this.selectedEdit.id;
    }
    console.log('save', this.productsSelected);
    return {
      id: id1,
      descripcion: this.input1,
      precio: parseFloat(this.input2),
      iva: parseFloat(this.input2) * this.constants.DEFAULT_IVA,
      platos: this.productsSelected,
      // tipoProducto: this.typeProducts[s1.selectedIndex],

      nombres: this.input7,
      // @ts-ignore
      tipoDocumento: this.typesDocument[s1.selectedIndex],
      dni: this.input8,
      telefono: this.input9,
    };
  }

  validate() {
    const w1 = this.write1();
    // const w2 = this.write2();
    // const w3 = this.write3();
    const w4 = this.write4();
    const w7 = this.write7();
    const w8 = this.write8();
    return !w1 || !w4 || !w7 || !w8; // || !w3;
  }

  save() {
    if (this.validate()) {
      return;
    }
    const item = this.getItem();
    if (this.selectedEdit) {
      this.myHttp.put('/factura', item).subscribe(
        data => {
          this.updateTable();
          $('[data-dismiss=modal]').trigger({ type: 'click' });
        }
      );
    } else {
      this.myHttp.post('/factura', item).subscribe(
        data => {
          this.updateTable();
          $('[data-dismiss=modal]').trigger({ type: 'click' });
        }
      );
    }
  }

  printEdit() {
    this.input1 = this.selectedEdit.descripcion;
    this.input2 = this.selectedEdit.precio;
    // this.input3 = this.selectedEdit.iva;
    if (this.selectedEdit.platos) {
      this.productsSelected = this.selectedEdit.platos;
    } else {
      this.productsSelected = [];
    }

    const s1 = document.getElementById('select1');
    // @ts-ignore
    s1.selectedIndex = this.searchIndexOption(this.typesDocument, this.selectedEdit.tipoDocumento);
    this.input7 = this.selectedEdit.nombres;
    this.input8 = this.selectedEdit.dni;
    this.input9 = this.selectedEdit.telefono;
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
    this.input2 = '';
    this.input7 = '';
    this.input8 = '';
    this.input9 = '';
    const s1 = document.getElementById('select1');
    // @ts-ignore
    s1.selectedIndex = 0;
  }

  private search(value: string) {
    this.itemsTable.filter = value.trim().toLowerCase();
  }

  removeElement(element: any) {
    if (confirm(Constants.remove)) {
      this.myHttp.delete('/factura/' + element.id).subscribe(
        data => {
          this.updateTable();
        }
      );
    }
  }

  saveElement() {
    this.productsSelected = [];
    this.selectedEdit = undefined;
    this.textTitle = 'Adicionar Factura';
    this.printCreate();
    this.clearFieldError();
  }

  editElement(element: any) {
    this.selectedEdit = element;
    this.textTitle = 'Editar Factura';
    this.printEdit();
    this.clearFieldError();
  }

  private clearFieldError() {
    this.message2 = this.message3 = this.message4 = this.message7 = this.message8 = this.message9 = '';
  }

  ngAfterViewInit(): void {
    this.itemsTable.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = Constants.ITEMS_TABLE_INVOICES;
  }

  check(item: any) {
    this.changeProductCheck(this.productsSelected, item);
  }

  changeProductCheck(products: any[], item: any) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === item.id) {
        products = products.splice(i, 1);
      }
    }
    products.push(item);
  }

  loadCheck(products: any[], item: any) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === item.id) {
        return true;
      }
    }
    return false;
  }
}
