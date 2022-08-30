import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { TicketService } from '../shared/services/tickets.service';
import { ticketModel } from '../interfaces/ticketModel';

let ELEMENT_DATA: ticketModel[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['inbound', 'outbound', 'fromDate', 'toDate', 'seatNumber', 'ticketType', 'price', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  isLoadingResults = true;

  ngUnsub = new Subject();

  constructor(public dialog: MatDialog, 
    private ticketService: TicketService, 
    public router: Router) { 
  }

  ngOnInit(): void {
    this.loadData();
  }

  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData(){
    this.ticketService.getTickets().pipe(takeUntil(this.ngUnsub))
    .subscribe(res => {
      console.log(res);
      
      ELEMENT_DATA = [];
      res.forEach(data => {
        ELEMENT_DATA.push({
          ...data,
          fromDate: data.fromDate.toDate(),
          toDate: data.toDate.toDate(),
        })
      });
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    })
  }

  

  onView(i: number){
    // this.dialog.open(PatientDialogComponent, {
    //   data: ELEMENT_DATA[i].propertyId,
    // });
  }
  onEdit(i: number){
    this.router.navigate(['patients/update/', ELEMENT_DATA[i].id]);
  }

  ngOnDestroy(){
    this.ngUnsub.next(null);
    this.ngUnsub.complete();
  }

}
