import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() submitted = new EventEmitter<string>();

  form = new FormGroup({
    term: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  // eventを使う場合
  // input(event: Event) {
  //   // this.term = (event.target as HTMLInputElement).value;
  // }

  submit() {
    this.submitted.emit(this.form.controls['term'].value);
  }
}
