
import {NgModule} from '@angular/core';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {ConfirmationDialogService} from './confirmation-dialog.service';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
  ],
  imports: [],
  exports: [
    ConfirmationDialogComponent,
  ],
  providers: [ ConfirmationDialogService ],
})
export class ConfirmationDialogModule { }

