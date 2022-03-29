import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [InputComponent, MessageComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, MessageComponent],
})
export class SharedModule {}
