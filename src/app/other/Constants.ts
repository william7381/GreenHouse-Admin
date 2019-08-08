
export class Constants {
  static readonly fieldVoid = 'Este campo es requerido';
  static readonly remove = '¿Desea eliminar este Elemento?';
  static readonly inNotInteger = 'El dato debe ser un numero entero';
  static readonly chooseProvider = 'Debe escoger un proveedor';
  static readonly chooseClient = 'Debe escoger un cliente';
  static inNotFloat = 'El dato debe ser un número entero o decimal';
  static inNotMinorZero = 'El número debe ser mayor o igual a 0';
  static chooseProducts = 'Debe escoger almenos 1 producto';
  static productsVoid = 'No existen platos';
  static chooseIngredients = 'Debe escoger almenos 1 ingrediente';
  static ingredientsVoid = 'No existen ingredientes';
  static chooseFileImage = 'Debe Seleccionar una imagen para el plato';
  static DEFAULT_IVA = 0.19;
  static ITEMS_FOR_PAGE_TITLE = 'por página';
  static ITEMS_TABLE_MENU = 'Menús ' + Constants.ITEMS_FOR_PAGE_TITLE;
  static ITEMS_TABLE_PROVIDERS = 'Proveedores ' + Constants.ITEMS_FOR_PAGE_TITLE;
  static ITEMS_TABLE_CITIES = 'Ciudades ' + Constants.ITEMS_FOR_PAGE_TITLE;
  static ITEMS_TABLE_TYPES_DOCUMENT = 'Tipos de Documento ' + Constants.ITEMS_FOR_PAGE_TITLE;
  static ITEMS_TABLE_TYPES_PLATE = 'Tipos de Plato ' + Constants.ITEMS_FOR_PAGE_TITLE;
  static ITEMS_TABLE_INVENTORY = 'Inventarios ' + Constants.ITEMS_FOR_PAGE_TITLE;
  static ITEMS_TABLE_INVOICES = 'Facturas ' + Constants.ITEMS_FOR_PAGE_TITLE;
  static COD_ERRORS: Error[] = [
    {code: 1, value: 'El nombre ya esta en uso, debe digitar uno diferente'},
    {code: 2, value: 'Este dni ya se encuentra registrado'},
  ];

  static getDateFromFormatString(format: string): Date {
    const dateAndTime: string[] = format.split('-');
    if (!format || dateAndTime.length < 2) {
      return null;
    }
    // const date: string[] = dateAndTime[0].split('-');
    const time: string[] = dateAndTime[3].split(':');
    return new Date(+dateAndTime[0], (+dateAndTime[1]) - 1, +dateAndTime[2], +time[0], +time[1], +time[2]);
  }

  static getFormatDate(date: Date) {
    const month = date.getMonth() + 1;
    const fullMonth = month < 10 ? '0' + month : month;
    const day = date.getDate();
    const fullDay = day < 10 ? '0' + day : day;
    const hour = date.getHours();
    const fullHour = hour < 10 ? '0' + hour : hour;
    const minute = date.getMinutes();
    const fullMinute = minute < 10 ? '0' + minute : minute;
    const second = date.getSeconds();
    const fullSecond = second < 10 ? '0' + second : second;
    return date.getFullYear() + '-' + fullMonth + '-' + fullDay + '-' + fullHour + ':' + fullMinute + ':' + fullSecond;
  }

  static getFormatDateToShow(date: Date) {
    const month = date.getMonth() + 1;
    const fullMonth = month < 10 ? '0' + month : month;
    const day = date.getDate();
    const fullDay = day < 10 ? '0' + day : day;
    const hour = date.getHours();
    const fullHour = hour < 10 ? '0' + hour : hour;
    const minute = date.getMinutes();
    const fullMinute = minute < 10 ? '0' + minute : minute;
    const second = date.getSeconds();
    const fullSecond = second < 10 ? '0' + second : second;
    return date.getFullYear() + '/' + fullMonth + '/' + fullDay + ' ' + fullHour + ':' + fullMinute + ':' + fullSecond;
  }

  static getErrorOfCode(code: number): Error {
    return this.COD_ERRORS.find(value => value.code === code);
  }

  static removeSpaces(value: any) {
    value = value + '';
    return value.trim().replace(/\s+/g, ' ');
  }
}

interface Error {
  code: number;
  value: string;
}
