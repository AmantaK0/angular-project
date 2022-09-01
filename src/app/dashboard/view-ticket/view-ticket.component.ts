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
      this.viewTicketData = res;
    })
  }
}
