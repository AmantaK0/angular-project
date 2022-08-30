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

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private ticketService: TicketService) { }

  ngOnInit(): void {

    this.createTicketForm = this.fb.group({
      id: ["", []],
      inbound: ["", [Validators.required, Validators.maxLength(3)]],
      outbound: ["", [Validators.required, Validators.maxLength(3)]],
      ticketType: ["", [Validators.required]],
      price: ["", [Validators.required]],
      fromDate: ["", [Validators.required]],
      toDate: ["", [Validators.required]],
      seatNumber: ["", [Validators.required]]
    });
  }

  onSubmit(){
    
    if(!this.createTicketForm.valid) return
    let ticketId = uuid.v4();
    this.createTicketForm.get("id")?.setValue(ticketId)
    this.ticketService.createTicket(this.createTicketForm.value);
  }
}
