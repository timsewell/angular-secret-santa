import { Component } from '@angular/core';
import { ElvesObservable } from '../core/elves-observable';

@Component({
  selector: 'app-elves-list',
  templateUrl: './elves-list.component.html'
})
export class ElvesListComponent {
    constructor( private messageService: ElvesObservable ) {}
}
