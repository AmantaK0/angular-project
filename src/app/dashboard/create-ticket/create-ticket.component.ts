import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketService } from 'src/app/shared/services/tickets.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  createTicketForm!: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, public ticketService: TicketService) { }

  ngOnInit(): void {

    this.createTicketForm = this.fb.group({
      id: ["", []],
      inbound: ["", [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern(/[A-Z]/)]],
      outbound: ["", [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern(/[A-Z]/)]],
      ticketType: ["", [Validators.required]],
      ticketTypeId: ["", []],
      price: ["", [Validators.required, Validators.min(1)]],
      fromDate: ["", [Validators.required]],
      toDate: ["", [Validators.required]],
      seatNumber: ["", [Validators.required, Validators.pattern(/[0-9]{2}[A-Z]{1}/), Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  onSubmit(){
    
    if(!this.createTicketForm.valid) return
    let ticketId = uuid.v4();
    this.createTicketForm.get("id")?.setValue(ticketId);
    switch(this.createTicketForm.get("ticketType")?.value) {
      case "First Class":
        this.createTicketForm.get("ticketTypeId")?.setValue(`${ticketId}-firstClass`)
        break
      case "Business Class":
        this.createTicketForm.get("ticketTypeId")?.setValue(`${ticketId}-businessClass`)
        break
      case "Economy Class":
        this.createTicketForm.get("ticketTypeId")?.setValue(`${ticketId}-economyClass`)
        break
      default:
    }

    this.ticketService.createTicket(this.createTicketForm.value);
  }
}
