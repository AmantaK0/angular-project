import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  isLoadingResults = true;

  ngUnsub = new Subject();

  constructor(public dialog: MatDialog, 
    // private patientsService: PatientsService, 
    public router: Router,
    private _liveAnnouncer: LiveAnnouncer) { 
  }

  ngOnInit(): void {
    this.loadData();
    this.isLoadingResults = false;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  @ViewChild(MatSort) sort!: MatSort;

  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData(){
    // this.patientsService.getPatients().pipe(takeUntil(this.ngUnsub))
    // .subscribe(e => {
    //   ELEMENT_DATA = [];
    //   e.forEach(data => {
    //     ELEMENT_DATA.push({title: data.title, dob: data.dob.toDate(), propertyId: data.id})
    //   });
    //   this.isLoadingResults = false;
    //   this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    // });
  }

  // onDelete(i: number){
  //   this.patientsService.deletePatients(ELEMENT_DATA[i].propertyId);
  //   this.isLoadingResults = true;
  //   this.loadData();
  // }

  onView(i: number){
    // this.dialog.open(PatientDialogComponent, {
    //   data: ELEMENT_DATA[i].propertyId,
    // });
  }
  onEdit(i: number){
    this.router.navigate(['patients/update/', ELEMENT_DATA[i].propertyId]);
  }

  ngOnDestroy(){
    // this.ngUnsub.next();
    this.ngUnsub.complete();
  }

}
