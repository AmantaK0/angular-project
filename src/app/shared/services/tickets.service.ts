import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ticketModel } from 'src/app/interfaces/ticketModel';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(public afStore:AngularFirestore, private router: Router, private snackBar: MatSnackBar) {
  }

  createTicket(createTicketForm: any) {

    this.afStore.collection('/tickets').doc(createTicketForm.id).set({
        id: createTicketForm.id,
        inbound: createTicketForm.inbound,
        outbound: createTicketForm.outbound,
        ticketType: createTicketForm.ticketType,
        price: createTicketForm.price,
        fromDate: createTicketForm.fromDate,
        toDate: createTicketForm.toDate,
        seatNumber: createTicketForm.seatNumber
        })
        .then(() => {
            this.snackBar.open("Ticket created", "Close");
            this.router.navigate([`/ticket/${createTicketForm.id}`])
        })
        .catch(error => {
          console.log(error);
        })
  }

  getTicket(id: string) {
    return this.afStore.collection('/tickets').doc(id).valueChanges().pipe(first())
  }

  getTickets() {
    return this.afStore.collection<ticketModel>('/tickets').valueChanges()
  }
}



