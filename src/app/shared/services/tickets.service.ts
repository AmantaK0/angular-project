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

  public isCreateTicketLoading = false;

  constructor(public afStore:AngularFirestore, private router: Router, private snackBar: MatSnackBar) {
  }

  createTicket(createTicketForm: any) {

    let isDuplicate = false;
    this.isCreateTicketLoading = true;
    this.getTickets().pipe(first()).subscribe(data => {
      data.forEach(el => {
        if(el.inbound === createTicketForm.inbound 
          && el.outbound === createTicketForm.outbound
          && el.fromDate.toDate().getTime() === createTicketForm.fromDate.getTime() 
          && el.toDate.toDate().getTime() === createTicketForm.toDate.getTime()
          && el.seatNumber === createTicketForm.seatNumber){
            isDuplicate = true;
          }
      }) 

      if(isDuplicate){
        this.isCreateTicketLoading = false;
        this.snackBar.open("Ticket already exists", "Close");
      }
      else{
        this.afStore.collection('/tickets').doc(createTicketForm.id).set({
          id: createTicketForm.id,
          inbound: createTicketForm.inbound,
          outbound: createTicketForm.outbound,
          ticketType: createTicketForm.ticketType,
          ticketTypeId: createTicketForm.ticketTypeId,
          price: createTicketForm.price,
          fromDate: createTicketForm.fromDate,
          toDate: createTicketForm.toDate,
          seatNumber: createTicketForm.seatNumber
          })
          .then(() => {
              this.isCreateTicketLoading = false;
              this.snackBar.open("Ticket created", "Close");
              this.router.navigate([`/ticket/${createTicketForm.id}`])
          })
          .catch(error => {
            this.isCreateTicketLoading = false;
            console.log(error);
          })
      }
    } )
    
    
  }

  getTicket(id: string) {
    return this.afStore.collection('/tickets').doc(id).valueChanges().pipe(first())
  }

  getTickets() {
    return this.afStore.collection<ticketModel>('/tickets').valueChanges()
  }
}



