import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
  constructor(private elementRef: ElementRef, private controlName: NgControl) {}

  ngOnInit() {
    // directiveからコントロールとフォームグループにアクセスできる。
    console.log(this.controlName.control);
    console.log(this.controlName.control?.parent);
    console.log(this.controlName.control?.parent?.value);

    this.controlName.control?.parent?.valueChanges
      .pipe(map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))))
      .subscribe((value) => {
        if (value < 0.2) {
          this.elementRef.nativeElement.classList.add('close');
        } else {
          this.elementRef.nativeElement.classList.remove('close');
        }
      });
  }
}
