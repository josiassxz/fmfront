import { Directive, ElementRef, HostListener, OnInit, forwardRef } from '@angular/core';

import * as BrV from 'br-validations';
import * as StringMask from 'string-mask';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

export function createCpfValidator() {
  return (c: FormControl) => {
    const err = {
      cpfPattern: true
    };
    return !BrV.cpf.validate(c.value) ? err : null;
  };
}

export function createCnpjValidator() {
  return (c: FormControl) => {
    const err = {
      cnpjPattern: true
    };
    return !BrV.cnpj.validate(c.value) ? err : null;
  };
}

@Directive({
  selector: '[BrCpfCnpjMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CpfCnpjDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CpfCnpjDirective),
      multi: true
    }
  ]
})
export class CpfCnpjDirective implements OnInit, ControlValueAccessor {
  /** Pattern created by StringMask library*/
  private cnpjPattern = new StringMask('00.000.000/0000-00');
  private cpfPattern = new StringMask('000.000.000-00');

  /** Placeholders for the callbacks which are later providesd by the Control Value Accessor*/
  private onChangeCallback = (_: any) => {};
  @HostListener('blur', ['$event'])
  private onTouchCallback = () => {};
  validateFn: any = () => {};

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    const cleanValue: string = this._cleanValue(this._elementRef.nativeElement.value);
    this._applyValueChanges(cleanValue);
  }

  /** Listener for input target of our directive*/
  @HostListener('input')
  onKeydow(): void {
    const cleanValue: string = this._cleanValue(this._elementRef.nativeElement.value);
    this._applyValueChanges(cleanValue);
  }

  /** From ControlValueAccessor interface*/
  /**
   * Write a new value to the element.
   */
  public writeValue(inputValue: string): void {
    if (!inputValue) {
      return;
    }

    const cleanValue: string = this._cleanValue(inputValue);
    if (cleanValue.length > 11) {
      this._elementRef.nativeElement.value = this.cnpjPattern.apply(cleanValue);
    } else {
      this._elementRef.nativeElement.value = this.cpfPattern.apply(cleanValue) || '';
    }
  }

  /** From ControlValueAccessor interface*/
  /**
   * Set the function to be called
   * when the control receives a change event.
   */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
    return;
  }

  /** From ControlValueAccessor interface*/
  /**
   * Set the function to be called
   * when the control receives a touch event.
   */
  public registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }

  /** It applies the mask in the input and updates the control's value. */
  private _applyValueChanges(cleanValue): void {
    let formattedValue: string;
    if (cleanValue.length > 11) {
      formattedValue = this.cnpjPattern.apply(cleanValue);
    } else {
      formattedValue = this.cpfPattern.apply(cleanValue) || '';
    }

    formattedValue = formattedValue.trim().replace(/[^0-9]$/, '');
    this._elementRef.nativeElement.value = formattedValue;
    this.onChangeCallback(cleanValue);
  }

  /** It clean the captured value in the input*/
  private _cleanValue(viewValue): string {
    return viewValue.replace(/[^\d]/g, '').slice(0, 14);
  }

  /** Return the validation result*/
  validate(c: FormControl) {
    if (c.value) {
      if (c.value.length > 11) {
        this.validateFn = createCnpjValidator();
      } else {
        this.validateFn = createCpfValidator();
      }
    }
    return this.validateFn(c);
  }
}
