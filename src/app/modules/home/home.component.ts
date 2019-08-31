import { Component, OnInit, NgModule } from "@angular/core";
import { ITicketResponse } from "../../commons/models/ticket/ticketResponse.model";
import { TicketService } from "../../core/services/ticket.service";
import { NbWindowService, NbWindowRef, NbToastrService } from "@nebular/theme";
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";
import { EditTicketComponent } from "../edit-ticket/edit-ticket.component";
import { TicketPropertiesService } from "src/app/core/services/ticketProperties.service";
import { ITicketProperty } from "src/app/commons/models/ticket/ticketProperty.model";
import { NbAuthService } from "@nebular/auth";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  tickets: ITicketResponse[] = [];
  openedTickets: ITicketResponse[] = [];
  createTicketWindowRef: NbWindowRef;
  editTicketWindowRef: NbWindowRef;

  ticketTypes: ITicketProperty[];
  serviceTypes: ITicketProperty[];
  priorities: ITicketProperty[];
  statuses: ITicketProperty[];

  userId: string;

  constructor(
    private ticketService: TicketService,
    private windowService: NbWindowService,
    private ticketPropertyService: TicketPropertiesService,
    private toastrService: NbToastrService,
    private authService: NbAuthService
  ) {}

  ngOnInit() {
    this.getTickets();
    this.getTicketProperties();
  }

  getTickets() {
    this.authService.getToken().subscribe(token => {
      if (token.isValid()) {
        this.userId = token.getPayload()[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
        this.ticketService.getTickets(this.userId).subscribe(response => {
          this.tickets = response;
          this.openedTickets = this.tickets.filter(
            ticket => !ticket.closeDateTime
          );
        });
      }
    });
  }

  openCreateTicketWindow() {
    this.createTicketWindowRef = this.windowService.open(
      CreateTicketComponent,
      { title: `Create Ticket` }
    );
    this.createTicketWindowRef.onClose.subscribe(close => {
      this.getTickets();
    });
  }

  closeTicket(ticket: ITicketResponse) {
    ticket.closeDateTime = new Date().toISOString();
    this.ticketService.updateTicket(ticket).subscribe(response => {
      if (response.closeDateTime) {
        this.toastrService.show("Ticket closed", "Sucess", {
          status: "success"
        });
      }
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
      this.getTickets();
    });
  }

  getTicketProperties() {
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
