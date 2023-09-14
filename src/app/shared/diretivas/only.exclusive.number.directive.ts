import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[toOnlyExclusiveNumber]'
})
export class OnlyExclusiveNumberDirective {
  private arrayRegex = /^[0-9]+$/;
  @Input()
  defaultMaxLength = 1;

  @HostListener('keypress', ['$event'])
  onKeypress(event: KeyboardEvent) {
    // console.log(event.key, this.arrayRegex.test(event.key))
    return this.arrayRegex.test(event.key);
    let patternOnlyNumber = null;
    if (this.defaultMaxLength && isNumeric(this.defaultMaxLength)) {
      patternOnlyNumber = new RegExp(`^[0-9]{1,${this.defaultMaxLength}}$`);
    } else {
      console.error('Caro desenvolvedor, informar o maxlength em tipo inteiro');
    }
    return patternOnlyNumber !== null ? patternOnlyNumber.test(event.key) : patternOnlyNumber;
  }
}

export function isNumeric(val: any): val is number | string {
  // parseFloat NaNs numeric-cast false positives (null|true|false|"")
  // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
  // subtraction forces infinities to NaN
  // adding 1 corrects loss of precision from parseFloat (#15100)
  return val - parseFloat(val) + 1 >= 0;
}
