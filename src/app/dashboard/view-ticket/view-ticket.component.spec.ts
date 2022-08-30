import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketComponent } from './view-ticket.component';

describe('viewTicketComponent', () => {
  let component: ViewTicketComponent;
  let fixture: ComponentFixture<ViewTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTicketComponent ]
    })
    .compileComponents();

    // fixture = TestBed.ViewTicketComponent(ViewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should view', () => {
    expect(component).toBeTruthy();
  });
});
