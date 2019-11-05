import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import md5 from 'md5';
import { IElfObject } from '../interfaces/elf-object';

@Injectable({ providedIn: 'root'})
export class ElvesObservable {
    // tslint:disable-next-line:variable-name
    private _elves = new BehaviorSubject([]);

    public readonly elves = this._elves.asObservable();

    private collRef = this.firestore.collection('users');

    constructor( private firestore: AngularFirestore ) {
        this.loadInitialData();
    }

    loadInitialData() {
        const resultsArray = [];

        this.collRef
            .get()
            .subscribe((message) => {
            const docs = (message || { docs : []}).docs;

            if (docs.length) {
                message.docs.forEach((aElf, aIndex) => {
                    const elf = aElf.data();

                    elf.showDelete = !elf.visited
                    && !elf.beingBoughtFor
                    && !elf.buyingFor
                        ? 'X'
                        : '';

                    elf.docId = aElf.id;
                    resultsArray.push(elf);
                    if (aIndex === docs.length - 1) {
                        this._elves.next(resultsArray);
                    }
                });
            }
        });
    }

    createElf(data: IElfObject) {
        const object: IElfObject = {
            name: data.name,
            hash: md5(data.name),
            buyingFor: false,
            beingBoughtFor: false,
            visited: false,
            email: data.email,
            sent: false,
            added: new Date()
        };

        const existing = this._elves.getValue();

        this.collRef
            .add(object)
            .then(() => {
                object.showDelete = 'X';
                existing.unshift(object);
                this._elves.next(existing);
            });
    }

    deleteElf(aDocId: string) {
        const existing: Array<IElfObject> = this._elves.getValue();

        this.collRef
            .doc(aDocId)
            .delete()
            .then(() => {
            this._elves.next(existing.filter(aElf => aElf.docId !== aDocId));
        });
    }

    editElf(aDocId: string, aData: any, aField: string) {
        const existing: Array<IElfObject> = this._elves.getValue();

        this.collRef
            .doc(aDocId)
            .set({
                [aField]: aData
            }, { merge: true }).then(res => {
                this._elves.next(existing.map(aElf => {
                    if (aElf.docId === aDocId) {
                        return {
                            ...aElf,
                            [aField]: aData
                        };
                    }
                    else {
                        return aElf;
                    }
            }));
        });
    }

    sendEmail(aDocId: string, aEvent: Event) {
        const existing: Array<IElfObject> = this._elves.getValue();

        const elf = existing.find(aElf => aElf.docId === aDocId);

        const link = `${window.location.protocol}//${window.location
            .host}/${elf.hash}`;

        aEvent.preventDefault();
        if (elf) {
            this.firestore.collection('mail').add({
                to: elf.email,
                name: elf.name,
                message: {
                    subject: 'Invitation to our Secret Santa!',
                    html: `Hi ${elf.name}<br><br>
                Want to join the Secret Santa?<br><br>
                Visit <a href="${link}">${link}</a>.
                <br><br>Cheers!<br>The Secret Santa Machine xx`,
                    text: `Hi\n\n,
                Want to join the Secret Santa?\n\n
                Visit ${link}.\n\n
                Cheers!\nThe Secret Santa Machine xx`
                }
            }).then(() => {
                this.editElf(elf.docId, true, 'sent');
            });
        }
    }
}
