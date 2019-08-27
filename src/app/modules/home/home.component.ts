import { Component, OnInit, NgModule } from '@angular/core';
import { ITicketResponse } from '../../commons/models/ticket/ticketResponse.model';
import { TicketService } from '../../core/services/ticket.service';
import { NbWindowService } from '@nebular/theme';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tickets: ITicketResponse[];
  openedTickets: ITicketResponse[];

  constructor(private ticketService: TicketService, private windowService: NbWindowService) { 
  }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(response => {
      this.tickets = response;
      this.openedTickets = this.tickets.filter(ticket => !ticket.closeDateTime)
    });
  }

  openCreateTicketWindow(){
    this.windowService.open(CreateTicketComponent, {title: `Create Ticket`});
  }

  closeTicket(ticket: ITicketResponse){
    ticket.closeDateTime = new Date().toISOString();
    console.log("ticket:");
    console.log(ticket);
    this.ticketService.updateTicket(ticket).subscribe(response =>{
      console.log(response);
    })
  }

}
