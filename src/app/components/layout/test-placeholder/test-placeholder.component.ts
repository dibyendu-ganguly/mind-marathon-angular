import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
    selector: 'app-test-placeholder',
    imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule, MatAutocompleteModule, MatButtonModule, MatSlideToggleModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatIconModule, MatInputModule, MatTabsModule, MatDatepickerModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './test-placeholder.component.html',
    styleUrl: './test-placeholder.component.scss'
})

export class TestPlaceholderComponent {

  swapped = false;
  selected = 'option2';
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  test = null;

  get selectedFund(){
    return this.stateCtrl.value;
  }
  set selectedFund(value:any){
    this.stateCtrl.setValue(value);
  }

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

 fundDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([
  {fundIndexCode:'fundIndexCode',fundManager:'fundManager'},
  {fundIndexCode:'fundIndexCode',fundManager:'fundManager'},
   {fundIndexCode:'fundIndexCode',fundManager:'fundManager'},
  {fundIndexCode:'fundIndexCode',fundManager:'fundManager'}

 ]);
 displayedColumns: string[] = ['fundIndexCode', 'fundManager', 'remove'];

 router = inject(Router);
 testm(){
  this.router.navigate(['test'], { queryParams: { fundCd: 'qwse' } });
 }
}
