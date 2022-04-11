import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appClass]',
})
export class ClassDirective {
  constructor(private ref: ElementRef) {
    console.log('ClassDirective.constructor');
  }

  // VER1
  // @Input() set backgroundColor(color: string) {
  //   this.ref.nativeElement.style.backgroundColor = color;
  // }

  // VER2
  // @Input() set appClass(color: string) {
  //   this.ref.nativeElement.style.backgroundColor = color;
  // }

  // VER3
  @Input() set appClass(classObj: any) {
    for (let key in classObj) {
      if (classObj[key]) {
        this.ref.nativeElement.classList.add(key);
      } else {
        this.ref.nativeElement.classList.remove(key);
      }
    }
  }
}
