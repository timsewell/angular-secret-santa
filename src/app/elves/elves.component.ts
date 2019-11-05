import { Component } from '@angular/core';
import { ElvesObservable } from '../core/elves-observable';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-elves',
  templateUrl: './elves.component.html'
})

export class ElvesComponent {
    form = new FormGroup({
        name: new FormControl(''),
        email: new FormControl('')
    });

    constructor( private elvesService: ElvesObservable ) {}

    onSubmit(aEvent: Event) {
        const data = this.form.value;

        aEvent.stopImmediatePropagation();
        this.elvesService.createElf(data);
        console.log(this.elvesService);
        this.form.reset();
    }
}
