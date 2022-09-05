import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { first } from 'rxjs';
import { TicketService } from '../shared/services/tickets.service';

export interface chartInbound {
    inbound: string;
    counter: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    inbounds: chartInbound[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().pipe(first()).subscribe(data => {
        data.forEach(el => {
            let inboundExists = this.inbounds.findIndex(e => e.inbound === el.inbound);
            if(inboundExists > -1){
                this.inbounds[inboundExists].counter += 1;
            }else{
                this.inbounds.push({
                    inbound: el.inbound,
                    counter: 1
                })
            }
        });
        Chart.register(...registerables); 
    // const ctx = document.getElementById('myChart');
        const myChart = new Chart("myChart", {
            type: 'bar',
            data: {
                labels: this.inbounds.sort((a, b) => b.counter - a.counter).map(el => el.inbound).slice(0, 6),
                datasets: [{
                    label: '# of Inbounds',
                    data: this.inbounds.sort((a, b) => b.counter - a.counter).map(el => el.counter).slice(0, 6),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    });
    
  }

}
