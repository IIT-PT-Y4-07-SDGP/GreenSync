import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-token-verification-dialog',
  templateUrl: './token-verification-dialog.component.html'
})
export class TokenVerificationDialogComponent implements OnInit {
  token: string = '';
  constructor(
    public dialogRef: MatDialogRef<TokenVerificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { participatedEventId: string }
  ) { }

  ngOnInit(): void {
  }

  // Function to close the dialog with 'verified' result when the user submits the token
  verifyToken(): void {
    // You can add additional validation here if needed
    if (this.token.trim() !== '') {
      this.dialogRef.close('verified');
    }
  }
}
