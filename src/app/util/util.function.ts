/*jshint bitwise: false*/

/**
 * Created by iago.almeida on 23/06/2017.
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import 'zone.js';
import { HttpParams } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';


@Injectable()
export class UtilFunction {
  /**
   * Faz o chamado destroy em subscriptions criadas, com o objetivo de reduzir possíveis memory leaks
   */
  stopSubscription(subscription: Subscription): void {
    if (subscription !== null && subscription !== undefined) {
      subscription.unsubscribe();
    }
  }

  /**
   * Retorna string de paramentros em url baseado em atributos e valores de um objeto
   */
  get_gueryparams_from_object(obj: any, complete?: boolean): string {
    let url = complete ? '?' : '';
    Object.keys(obj).forEach((key: any, index: number) => {
      if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
        url = url.concat((complete && index === 0 ? '' : '&') + key + '=' + obj[key].toString());
      }
    });
    return url;
  }

  /**
   * Retorna objeto HttpParams em url baseado em atributos e valores de um objeto
   */
  get_http_params_from_object(obj: any): HttpParams {
    let params = new HttpParams();
    Object.keys(obj).forEach((key: any, index: number) => {
      if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
        params = params.append(key, obj[key].toString());
      }
    });
    return params;
  }

  /**
   * Retorna string de parametros em url baseado em atributos e valores de uma lista de objeto literal
   */
  get_gueryparams_from_array_primitive(array: any[], key): string {
    let url = '?';
    array.forEach((value: any, index: number) => {
      if (value !== null && value !== '' && value !== undefined) {
        url = url.concat((index === 0 ? '' : '&') + key + '=' + value.toString());
      }
    });
    return url;
  }

  /**
   * Retorna objeto HttpParams em url baseado em atributos e valores de uma lista de objeto literal
   */
  get_http_params_from_array_primitive(array: any[], key): HttpParams {
    let params = new HttpParams();
    array.forEach((value: any) => {
      if (value !== null && value !== '' && value !== undefined) {
        params = params.append(key, value.toString());
      }
    });
    return params;
  }

  /**
   * Retorna objeto HttpParams em url baseado em atributos e valores de uma lista de objeto literal
   */
  append_http_params(arrayHttpParams: HttpParams[]): HttpParams {
    let params = new HttpParams();
    arrayHttpParams.forEach((httpParam: any) => {
      if (httpParam && httpParam.updates && httpParam.updates.length > 0) {
        httpParam.updates.forEach((update: any) => {
          if (httpParam.has(update.param)) {
            params = params.append(update.param, update.value);
          }
        });
      }
    });
    return params;
  }

  /**
   * Cria e retorna ids randomicos de uso no front-end
   */
  new_guid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Função que transforma um objeto complexo em uma string query param.
   * @param {any} obj. Objeto que será transformado em query param.
   * @param {boolean} firstDelimiter. Passe false se quer que inicie a string com delimitador &, do contrário iniciará com ?.
   * @param {boolean} arrayFormat. Passe false se quiser um array key=value&key=value, do contrário será key[value,value].
   * @returns {string}
   */
  objectToQuerystring(obj: any, firstDelimiter: boolean = true, arrayFormat: boolean = true): string {
    return Object.keys(obj)
      .filter(key => obj[key] !== undefined && obj[key] !== '')
      .reduce((str, key, i) => {
        let delimiter: string, val;
        delimiter = i === 0 && firstDelimiter ? '?' : '&';
        if (Array.isArray(obj[key])) {
          let firstIteration = true;
          key = encodeURIComponent(key);
          let strUrlArray = '';
          if (arrayFormat) {
            const arrayVar = [str, firstIteration && delimiter === '' ? '?' : '&', key, '=', obj[key].toString()].join(
              ''
            );
            return [arrayVar].join('');
          } else {
            const arrayVar = obj[key].reduce((str, item) => {
              val = String(item);
              if (val === 'null' || val === '') {
                strUrlArray = [str].join('');
              } else {
                strUrlArray = [str, firstIteration && delimiter === '' ? '?' : '&', key, '=', val].join('');
                firstIteration = false;
              }
              return strUrlArray;
            }, '');
            return [str, arrayVar].join('');
          }
        } else {
          key = encodeURIComponent(key);
          val = String(obj[key]);
          if (val === 'null' || val === '') {
            return i === 0 ? [delimiter, key, '=', val].join('') : [str].join('');
          } else {
            return [str, delimiter, key, '=', val].join('');
          }
        }
      }, '');
  }

  /**
   * Realiza iteração em dois objetos e faz reflexão em propriedades com mesmo nome e tipo
   */
  extend(target, src): any {
    Object.keys(src).forEach(function(key) {
      if (target.hasOwnProperty(key)) {
        target[key] = src[key];
      }
    });
    return target;
  }

  /**
   * Facilita a conversão de um atributo em base64 para buffer de bytes
   *
   * @example
   *  imprimir() {
   *      this.relatorioService.imprimir(this.resumoPedido.numero).subscribe((response: any) => {
   *          if (response.value) {
   *              console.log(response);
   *              const file = new Blob([this.utilFunction.base64ToArrayBuffer(response.value)], {type: 'application/pdf'});
   *              const fileURL  = window.URL.createObjectURL(file);
   *              window.open(fileURL);
   *          }
   *      });
   *  }
   */
  base64_to_array_buffer(base64): ArrayBufferLike {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  array_move(arr: any[], old_index: number, new_index: number): any[] {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  }

  syntaxHighlight(json): string {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function(match) {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }

  getFirstDayMonth(): Date {
    const datainicial = new Date();
    datainicial.setDate(1);
    datainicial.setHours(0);
    datainicial.setMinutes(0);
    datainicial.setSeconds(0);
    return datainicial;
  }

  /*
  *
  * Extrai o último dia do mês
  *
  * */
  getLastDate(data: Date) {
    const dia = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();
    return new Date(data.getFullYear(), data.getMonth(), dia);
  }

  /**
   * Formata uma datas em yyyy-mm-dd
   */
  formatDate(date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  /**
   * Recebe uma data no formato ddmmyyyy
   * Formata uma datas em  dd/mm/yyyy
   */
  formatDatePTBR(date): string {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('/');
  }
  /**
   * Recebe uma data no formato ddmmyyyy
   * Retorna a data convertida em um objeto Date
   */
  converterData(data: string): Date {
    const ano = parseInt(data.substring(4, 8), 10);
    const mes = parseInt(data.substring(2, 4), 10) - 1;
    const dia = parseInt(data.substring(0, 2), 10);

    return new Date(ano, mes, dia);
  }

  getCurrentDay(dataAtual: Date): Date {
    dataAtual.setHours(23);
    dataAtual.setMinutes(59);
    dataAtual.setSeconds(59);
    return dataAtual;
  }

  /**
   * Facilita a conversão de uma string para Date
   *
   * @example
   *  this.utilFunction.stringToDate("17/9/2014","dd/MM/yyyy","/");
   *  this.utilFunction.stringToDate("9/17/2014","mm/dd/yyyy","/")
   *  this.utilFunction.stringToDate("9-17-2014","mm-dd-yyyy","-")
   *  }
   */
  stringToDate(_date, _format, _delimiter) {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    let month = parseInt(dateItems[monthIndex], 10);
    month -= 1;
    const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }

  stringToDateTime(_date, _format, _delimiter) {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    let month = parseInt(dateItems[monthIndex], 10);
    month -= 1;
    const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex], 0, 0, 0);
    return formatedDate;
  }

  unique(array: any, propertyName: string): any {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

  isDateInArray(array: Date[], value: Date): boolean {
    return !!array.find(item => {
      return item.getTime() === value.getTime();
    });
  }

  isDateStringInArray(array: string[], value: string): boolean {
    return (
      (
        array.find(item => {
          return item === value;
        }) || []
      ).length > 0
    );
  }

  groupBy(list, keyGetter) {
    return list.reduce(function(rv, x) {
      (rv[x[keyGetter]] = rv[x[keyGetter]] || []).push(x);
      return rv;
    }, {});
  }

  differenceInDays(firstDate: Date, secondDate: Date): number {
    const diffTime = Math.abs(secondDate.getTime() - firstDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  freezer(obj) {
    Object.getOwnPropertyNames(obj).forEach(name => {
      if (typeof obj[name] === 'object' && obj[name] !== null) {
        this.freezer(obj[name]);
      }
    });
    return Object.freeze(obj);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  writeBlob(content, fileName, contentType): Blob {
    const byteCharacters = atob(content);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: contentType });
  }

  currencyFormatter() {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  arrayGroupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  arraySortByKey(array: any[], key: string): any[] {
    const values = array.sort(function(a, b) {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    });
    return values;
  }

  arraySortByKeyDesc(array: any[], key: string): any[] {
    return array.sort(this.funcSortDesc(key));
  }

  funcSortDesc(key: string) {
    return function(a, b) {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
      return 0;
    };
  }

  compareEqualsByKey(otherArray, key: string) {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return other[key] === current[key];
        }).length === 0
      );
    };
  }

  get_params_from_object(obj: any): String {
    let url = '?';
    Object.keys(obj).forEach((key: any, index: number) => {
      if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
        const array = Array.from(obj[key]);
        for (let i = 0; i < array.length; i++) {
          url = url.concat(key + '=' + array[i].toString() + '&');
        }
      }
    });

    return url.substr(0, url.length - 1).toString();
  }

  formataCPF(cpf): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  getMapParams(obj: any): String {
    let url = '?';
    Object.keys(obj).forEach((key: any, index: number) => {
      if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
        const array = Array.from(obj[key]);
        for (let i = 0; i < array.length; i++) {
          if (array[i] !== undefined && array[i] !== null) {
            if (i === 0) {
              url = url.concat(key + '=' + array[i].toString());
            } else {
              url = url.concat(',' + array[i].toString());
            }
          }
          if (i === array.length - 1) {
            url = url.concat('&');
          }
        }
      }
    });

    return url.substr(0, url.length - 1).toString();
  }

  getMapParamsPage(filtro, size, page): HttpParams {
    let params = this.get_http_params_from_object(filtro);
    if (page != null) {
      params = params.append('page', page);
    }
    if (size != null) {
      params = params.append('size', size);
    }
    return params;
  }

  isEmpty(arr: []) {
    return typeof arr === 'undefined' || arr.length <= 0;
  }

  capaBase64(capa: any): any {
    return capa ? this.srcBase64(capa.capa) : null;
  }

  capasBase64(capas: any[]): any[] {
    if (capas) {
      capas.forEach(cp => {
        cp.src = this.srcBase64(cp.arquivo);
      });
    }
    return capas;
  }

  galeriasBase64(galerias: any[]): any[] {
    if (galerias) {
      galerias.forEach(gc => {
        gc.src = this.srcBase64(gc.arquivo);
      });
    }
    return galerias;
  }

  private srcBase64(arquivo: any): any {
    return 'data:image/jpg;base64,' + arquivo;
  }

  getToday() {
    return moment(new Date())
      .format()
      .substring(0, 16);
  }

  getTodaySumHour() {
    return moment(new Date())
      .add(1, 'hours')
      .minute(0)
      .format()
      .substring(0, 16);
  }

  getDateFormat(date: Date) {
    return moment(date)
      .format()
      .substring(0, 16);
  }

  /*
    *  Remove accents/diacritics from both the values in
    *  the table as well as the filter value so that even
    *  if the user happens to enter characters which have
    *  accents/diacritics, the filter will continue to filter correctly.
    * */
  prepareToFilter(data: any, filter: any): boolean {
    const dataStr = Object.keys(data)
      .reduce((currentTerm: string, key: string) => {
        return currentTerm + (data as { [key: string]: any })[key] + '◬';
      }, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const transformedFilter = filter
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    return dataStr.indexOf(transformedFilter) !== -1;
  }

  firstLetterToUpperCase(str) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

}
