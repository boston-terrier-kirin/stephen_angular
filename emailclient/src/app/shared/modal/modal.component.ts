import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() dismiss = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // これでapp-modalがbody直下にくるので、親要素のCSS引き継ぎ問題を解決できる。
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // app-modalをbody直下に配置しているので、手動で消しに行かないとapp-auth-modalが残ったままになる。
    this.el.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit();
  }
}
