import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef) {
    // elementRefでapp-modalが取得できる。
    // console.log(this.elementRef);
  }

  ngOnInit(): void {
    // モーダルはbody直下にしないと、バックドロップと表示位置が狂うので、
    // elementRefでapp-modalを取得して、body直下に追加する。
    document.body.appendChild(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
}
