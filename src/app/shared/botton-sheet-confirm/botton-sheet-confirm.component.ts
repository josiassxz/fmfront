import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Component, Inject, Optional } from '@angular/core';

@Component({
  selector: 'dpe-intra-botton-sheet-confirm',
  templateUrl: 'botton-sheet-confirm.component.html',
  styleUrls:['botton-sheet-confirm.component.css']
})
export class BottonSheetConfirmComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottonSheetConfirmComponent>,
    @Optional()
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: any
  ) {}

  confirmAction(event: MouseEvent, b: boolean): void {
    this.bottomSheetRef.dismiss(b);
    event.preventDefault();
  }
}
