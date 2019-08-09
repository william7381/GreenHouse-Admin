import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from '../other/Constants';
import {HttpClientService} from '../ServiceHttpClient/http-client.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.css']
})
export class NewProviderComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchTerm: any;
  itemsTable = new MatTableDataSource();

  message1: any;
  message2: any;
  message3: any;
  message4: any;
  message5: any;
  message6: any;
  input1: any = 'a';
  input2: any = 'a';
  input3: any = 'a';
  input4: any = 'a';
  input5: any = 'a';
  input6: any = 'a';

  typesDocument: any[];
  cities: any[];

  isLoadingTable = false;

  displayedColumns: string[] = ['po', 'no', 'ap', 'dn', 'nc', 'di', 'te', 'op'];

  selectedEdit;

  textTitle;
  input3Last: any;
  input4Last: any;

  constructor(private myHttp: HttpClientService) {
    this.updateTable();
    this.myHttp.get('/documentos').subscribe(
      data => {
        // @ts-ignore
        this.typesDocument = data;
      }
    );
    this.myHttp.get('/ciudades').subscribe(
      data => {
        // @ts-ignore
        this.cities = data;
      }
    );
  }

  updateTable() {
    this.itemsTable.data = [];
    this.isLoadingTable = true;
    this.myHttp.get('/proveedores').subscribe(
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
    // var dblVar = parseFloat(strVar);
    // if (isNaN(dblVar)) {
    //   alert("error");
    // }
  }
  write2() {
    this.input2 = Constants.removeSpaces(this.input2);
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
    this.message3 = '';
    return true;
  }
  write4() {
    this.input4 = Constants.removeSpaces(this.input4);
    const value = this.input4;
    if (!value) {
      this.message4 = Constants.fieldVoid;
      return false;
    }
    this.message4 = '';
    return true;
  }
  write5() {
    this.input5 = Constants.removeSpaces(this.input5);
    const value = this.input5;
    if (!value) {
      this.message5 = Constants.fieldVoid;
      return false;
    }
    this.message5 = '';
    return true;
  }
  write6() {
    this.input6 = Constants.removeSpaces(this.input6);
    const value = this.input6;
    if (!value) {
      this.message6 = Constants.fieldVoid;
      return false;
    }
    this.message6 = '';
    return true;
  }

  getItem() {
    let id1 = -1;
    const s1 = document.getElementById('select1');
    const s2 = document.getElementById('select2');
    if (this.selectedEdit) {
      id1 = this.selectedEdit.id;
    }
    return {
      id: id1,
      dni: this.input3,
      nombreComercial: this.input4,
      nombres: this.input1,
      apellidos: this.input2,
      direccion: this.input5,
      telefono: this.input6,
      // @ts-ignore
      tipoDocumento: this.typesDocument[s1.selectedIndex],
      // @ts-ignore
      ciudad: this.cities[s2.selectedIndex],
    };
  }

  validate() {
    const w1 = this.write1();
    const w2 = this.write2();
    const w3 = this.write3();
    const w4 = this.write4();
    const w5 = this.write5();
    const w6 = this.write6();
    return !w1 || !w2 || !w3 || !w4 || !w5 || !w6;
  }

  save() {
    if (this.validate()) {
      return;
    }
    const item = this.getItem();
    if (this.selectedEdit) {
      const numberSend1 = (this.input3Last + '').toUpperCase() === (this.input3 + '').toUpperCase() ? 0 : 1;
      const numberSend2 = (this.input4Last + '').toUpperCase() === (this.input4 + '').toUpperCase() ? 0 : 1;
      this.myHttp.put('/proveedor/' + numberSend1 + '/' + numberSend2, item).subscribe(
        data => {
          // @ts-ignore
          if (data.error) {
            // @ts-ignore
            if (data.error === 1) {
              this.message4 = Constants.getErrorOfCode(1).value;
              // @ts-ignore
            } else if (data.error === 2) {
              this.message3 = Constants.getErrorOfCode(2).value;
            }
            return;
          }
          this.updateTable();
          $('[data-dismiss=modal]').trigger({ type: 'click' });
        }
      );
    } else {
      this.myHttp.post('/proveedor', item).subscribe(
        data => {
          // @ts-ignore
          if (data.error) {
            // @ts-ignore
            if (data.error === 1) {
              this.message4 = Constants.getErrorOfCode(1).value;
              // @ts-ignore
            } else if (data.error === 2) {
              this.message3 = Constants.getErrorOfCode(2).value;
            }
            return;
          }
          this.updateTable();
          $('[data-dismiss=modal]').trigger({ type: 'click' });
        }
      );
    }
  }

  printEdit() {
    this.input1 = this.selectedEdit.nombres;
    this.input2 = this.selectedEdit.apellidos;
    this.input3 = this.input3Last = this.selectedEdit.dni;
    this.input4 = this.input4Last = this.selectedEdit.nombreComercial;
    this.input5 = this.selectedEdit.direccion;
    this.input6 = this.selectedEdit.telefono;
    const s1 = document.getElementById('select1');
    // @ts-ignore
    s1.selectedIndex = this.searchIndexOption(this.typesDocument, this.selectedEdit.tipoDocumento);
    const s2 = document.getElementById('select2');
    // @ts-ignore
    s2.selectedIndex = this.searchIndexOption(this.cities, this.selectedEdit.ciudad);
  }

  printCreate() {
    this.input1 = '';
    this.input2 = '';
    this.input3 = this.input3Last = '';
    this.input4 = this.input4Last = '';
    this.input5 = '';
    this.input6 = '';
    const s1 = document.getElementById('select1');
    // @ts-ignore
    s1.selectedIndex = 0;
    const s2 = document.getElementById('select2');
    // @ts-ignore
    s2.selectedIndex = 0;
  }

  searchIndexOption(typesDocument: any[], tipoDocumento: any) {
    for (let i = 0; i < typesDocument.length; i++) {
      if (typesDocument[i].id === tipoDocumento.id) {
        return i;
      }
    }
    return 0;
  }

  private search(value: string) {
    this.itemsTable.filter = value.trim().toLowerCase();
  }

  removeElement(element: any) {
    if (confirm(Constants.remove)) {
      this.myHttp.delete('/proveedor/' + element.id).subscribe(
        data => {
          this.updateTable();
        }
      );
    }
  }

  saveElement() {
    this.selectedEdit = undefined;
    this.textTitle = 'Agregar Proveedor';
    this.printCreate();
    this.clearFieldError();
  }

  editElement(element: any) {
    this.selectedEdit = element;
    this.textTitle = 'Editar Proveedor';
    this.printEdit();
    this.clearFieldError();
  }

  private clearFieldError() {
    this.message1 = this.message2 = this.message3 = this.message4 = this.message5 = this.message6 = '';
  }

  ngAfterViewInit(): void {
    this.itemsTable.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = Constants.ITEMS_TABLE_PROVIDERS;
  }
}
