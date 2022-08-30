import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/shared/services/tickets.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  ticketId = this.router.snapshot.paramMap.get('id')!;
  viewTicketData!: any;

  constructor(private router: ActivatedRoute, private snackBar: MatSnackBar, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getTicket(this.ticketId).subscribe(res => {
      console.log(res);
      this.viewTicketData = res;
    })
  }

  // onSubmit(){
    
  //   if(!this.viewTicketForm.valid) return
  //   let ticketId = uuid.v4();
  //   this.viewTicketForm.get("id")?.setValue(ticketId)
  //   this.ticketService.viewTicket(this.viewTicketForm.value);
  // }
}
