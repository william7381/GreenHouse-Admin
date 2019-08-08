import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Constants} from '../other/Constants';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchTerm: any;
  itemsTable = new MatTableDataSource();

  constants = Constants;

  message1: any;
  message2: any;
  message3: any;
  message4: any;
  message5: any;
  message6: any;
  input1: any = 'a';
  input2: any = 'a';
  input3: any = '3';
  input4: any = '3';

  isLoadingTable = false;

  displayedColumns: string[] = ['po', 'no', 'de', 'pv', 'pc', 'fe', 'ti', 'op'];
  typeProducts: any[];
  ingredients: any[];

  ingredientsSelected: any[] = [];

  selectedEdit;
  textTitle;
  imagePath = '';

  resultImage: string | ArrayBuffer;

  constructor(private myHttp: HttpClientService) {
    this.updateTable();
    this.myHttp.get('/tiposProducto').subscribe(
      data => {
        // @ts-ignore
        this.typeProducts = data;
      }
    );
    this.myHttp.get('/ingredientes').subscribe(
      data => {
        // @ts-ignore
        this.ingredients = data;
      }
    );
  }

  updateTable() {
    this.itemsTable.data = [];
    this.isLoadingTable = true;
    this.myHttp.get('/platos').subscribe(
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
    if (Number.isNaN(parseFloat(value))) {
      this.message3 = Constants.inNotFloat;
      return false;
    }
    if (parseFloat(value) < 0) {
      this.message3 = Constants.inNotMinorZero;
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
    this.input4 = Constants.removeSpaces(this.input4);
    const value = this.input4;
    if (!value) {
      this.message4 = Constants.fieldVoid;
      return false;
    }
    if (Number.isNaN(parseFloat(value))) {
      this.message4 = Constants.inNotFloat;
      return false;
    }
    if (parseFloat(value) < 0) {
      this.message4 = Constants.inNotMinorZero;
      return false;
    }
    this.message4 = '';
    return true;
    // var dblVar = parseFloat(strVar);
    // if (isNaN(dblVar)) {
    //   alert("error");
    // }
  }
  write5() {
    let value = this.ingredients;
    if (!value || value.length === 0) {
      this.message5 = Constants.ingredientsVoid;
      return false;
    }
    value = this.ingredientsSelected;
    if (!value || value.length === 0) {
      this.message5 = Constants.chooseIngredients;
      return false;
    }
    this.message5 = '';
    return true;
  }
  write6() {
    const file = document.getElementById('file');
    // @ts-ignore
    if (!this.imagePath && (file.files === null || file.files.length === 0)) {
      this.message6 = Constants.chooseFileImage;
      return false;
    }
    // @ts-ignore
    if (file.files !== null && file.files.length !== 0) {
      // @ts-ignore
      this.imagePath = file.files[0].name;
    }
    this.message6 = '';
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
      precioVenta: parseFloat(this.input3),
      precioCosto: parseFloat(this.input4),
      ingredientes: this.ingredientsSelected,
      imagen: this.imagePath,
      // fechaIngreso: Constants.getFormatDate(new Date()),
      // @ts-ignore
      tipoProducto: this.typeProducts[s1.selectedIndex],
    };
  }

  validate() {
    const w1 = this.write1();
    // const w2 = this.write2();
    const w3 = this.write3();
    const w4 = this.write4();
    const w5 = this.write5();
    const w6 = this.write6();
    return !w1 || !w3 || !w4 || !w5 || !w6;
  }

  save() {
    if (this.validate()) {
      return;
    }
    const item = this.getItem();
    if (this.selectedEdit) {
      this.myHttp.put('/plato', item).subscribe(
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
      this.myHttp.post('/plato', item).subscribe(
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
    this.input1 = this.selectedEdit.nombre;
    this.input2 = this.selectedEdit.descripcion;
    this.input3 = this.selectedEdit.precioVenta;
    this.input4 = this.selectedEdit.precioCosto;
    this.imagePath = this.selectedEdit.imagen;
    if (this.selectedEdit.ingredientes) {
      this.ingredientsSelected = this.selectedEdit.ingredientes;
    } else {
      this.ingredientsSelected = [];
    }
    const s1 = document.getElementById('select1');
    // @ts-ignore
    s1.selectedIndex = this.searchIndexOption(this.typeProducts, this.selectedEdit.tipoProducto);
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
    this.input3 = '';
    this.input4 = '';
    this.imagePath = '';
    const s1 = document.getElementById('select1');
    // @ts-ignore
    s1.selectedIndex = 0;
  }

  private search(value: string) {
    this.itemsTable.filter = value.trim().toLowerCase();
  }

  removeElement(element: any) {
    if (confirm(Constants.remove)) {
      this.myHttp.delete('/plato/' + element.id).subscribe(
        data => {
          this.updateTable();
        }
      );
    }
  }

  saveElement() {
    this.selectedEdit = undefined;
    this.textTitle = 'Agregar Menú';
    this.printCreate();
    this.clearFieldError();
  }

  editElement(element: any) {
    this.selectedEdit = element;
    this.textTitle = 'Editar Menú';
    this.printEdit();
    this.clearFieldError();
  }

  private clearFieldError() {
    this.message1 = this.message2 = this.message3 = this.message4 = this.message5 = this.message6 = '';
    $('#file').val('');
  }

  ngAfterViewInit(): void {
    this.itemsTable.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = Constants.ITEMS_TABLE_MENU;
  }

  check(item: any) {
    this.changeProductCheck(this.ingredientsSelected, item);
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

  getImagePath() {
    return '../../assets/' + this.imagePath;
  }
}
