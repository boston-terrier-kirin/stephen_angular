import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [InputComponent, MessageComponent, ModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, MessageComponent, ModalComponent],
})
export class SharedModule {}
