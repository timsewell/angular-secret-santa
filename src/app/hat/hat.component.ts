import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ElvesObservable } from '../core/elves-observable';
import { IElfObject } from '../interfaces/elf-object';

@Component({
  selector: 'app-hat',
  templateUrl: './hat.component.html'
})
export class HatComponent implements OnInit {
    private elves: Array<IElfObject>;
    private currentUser: IElfObject | string = '';
    private allocatedUser: IElfObject | string = '';
    private extraClass = '';

    constructor( private elfService: ElvesObservable ) { }

    ngOnInit(): void {
        this.elfService.elves.pipe(first(res => !!res.length))
            .subscribe((res: Array<IElfObject>) => {
            if (res.length) {
                this.elves = res;
                this.getCurrentUser();
            }
        });
    }

    private getCurrentUser() {
        const hash: string = window.location.pathname.slice(1);

        let currentUser: IElfObject;

        if (hash && hash.length) {
            currentUser = this.elves.find(aElf => aElf.hash === hash);
            if (currentUser) {
                this.currentUser = currentUser;
                this.elfService.editElf(this.currentUser
                    .docId, 1, 'visited');
                if (!currentUser.buyingFor) {
                    this.shakeTheHat();
                }
                else {
                    this.allocatedUser = this.elves
                        .find(aElf => aElf.beingBoughtFor === currentUser.hash);
                }
                setTimeout(() => {
                    this.extraClass = 'show';
                }, 500);
            }
        }
    }

    private shakeTheHat() {
        const unallocated: Array<IElfObject> = this.elves.filter(aElf =>
            // @ts-ignore
            aElf.hash !== this.currentUser.hash && !aElf.beingBoughtFor);

        const length: number = unallocated.length;

        const rand: number = Math.floor(Math.random() * length);

        if (length) {
            this.allocatedUser = unallocated[rand];
            this.elfService.editElf(this.allocatedUser.docId, this
                // @ts-ignore
                .currentUser.hash, 'beingBoughtFor');
            // @ts-ignore
            this.elfService.editElf(this.currentUser.docId, this
                .allocatedUser.hash, 'buyingFor');
        }
    }
}
