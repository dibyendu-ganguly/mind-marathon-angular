import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ToastData{
  message: string;
  type: 'success'|'error';
}
@Component({
    selector: 'app-toast',
    imports: [MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ToastData,
    public snackBarRef : MatSnackBarRef<ToastComponent>) { }
  ngOnInit(): void {
    console.log(this.data);
  }



}
