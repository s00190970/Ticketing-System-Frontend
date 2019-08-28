import { Component, OnInit, NgModule } from "@angular/core";
import { ITicketResponse } from "../../commons/models/ticket/ticketResponse.model";
import { TicketService } from "../../core/services/ticket.service";
import { NbWindowService, NbWindowRef } from "@nebular/theme";
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";
import { ITicketRequest } from "src/app/commons/models/ticket/ticketRequest.model";
import { EditTicketComponent } from "../edit-ticket/edit-ticket.component";
import { TicketPropertiesService } from "src/app/core/services/ticketProperties.service";
import { ITicketProperty } from "src/app/commons/models/ticket/ticketProperty.model";
import { IWindowContext } from "src/app/commons/models/context/windowContext.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  tickets: ITicketResponse[];
  openedTickets: ITicketResponse[];
  createTicketWindowRef: NbWindowRef;
  editTicketWindowRef: NbWindowRef;

  ticketTypes: ITicketProperty[];
  serviceTypes: ITicketProperty[];
  priorities: ITicketProperty[];
  statuses: ITicketProperty[];

  constructor(
    private ticketService: TicketService,
    private windowService: NbWindowService,
    private ticketPropertyService: TicketPropertiesService
  ) {}

  ngOnInit() {
    this.getTickets();
    this.getTicketProperties();
  }

  private getTickets() {
    this.ticketService.getTickets().subscribe(response => {
      this.tickets = response;
      this.openedTickets = this.tickets.filter(ticket => !ticket.closeDateTime);
      console.log("get tickets");
      console.log(this.openedTickets)
    });
  }

  openCreateTicketWindow() {
    this.createTicketWindowRef = this.windowService.open(
      CreateTicketComponent,
      { title: `Create Ticket` }
    );
    this.createTicketWindowRef.onClose.subscribe(close => {
      console.log("window closed");
      this.getTickets();
    });
  }

  closeTicket(ticket: ITicketResponse) {
    ticket.closeDateTime = new Date().toISOString();
    console.log("ticket:");
    console.log(ticket);
    this.ticketService.updateTicket(ticket).subscribe(response => {
      console.log(response);
      this.getTickets();
    });
  }

  openEditTicketWindow(ticket: ITicketResponse) {
    this.editTicketWindowRef = this.windowService.open(EditTicketComponent, {
      title: "Edit Ticket",
      context: {
        ticket: ticket,
        priorities: this.priorities,
        ticketTypes: this.ticketTypes,
        serviceTypes: this.serviceTypes,
        statuses: this.statuses
      }
    });
    this.editTicketWindowRef.onClose.subscribe(close => {
      console.log("window closed");
      this.getTickets();
    });
  }

  private getTicketProperties() {
    this.ticketPropertyService.getPriorities().subscribe(response => {
      this.priorities = response;
    });

    this.ticketPropertyService.getServiceTypes().subscribe(response => {
      this.serviceTypes = response;
    });

    this.ticketPropertyService.getTicketTypes().subscribe(response => {
      this.ticketTypes = response;
    });

    this.ticketPropertyService.getStatuses().subscribe(response => {
      this.statuses = response;
    });
  }
}
