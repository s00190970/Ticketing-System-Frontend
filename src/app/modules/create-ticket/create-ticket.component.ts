import { Component, OnInit } from "@angular/core";
import { TicketPropertiesService } from "src/app/core/services/ticketProperties.service";
import { ITicketProperty } from "src/app/commons/models/ticket/ticketProperty.model";
import { ITicketResponse } from "src/app/commons/models/ticket/ticketResponse.model";
import { ITicketRequest } from "src/app/commons/models/ticket/ticketRequest.model";
import { TicketService } from "src/app/core/services/ticket.service";
import { NbWindowRef, NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-create-ticket",
  templateUrl: "./create-ticket.component.html",
  styleUrls: ["./create-ticket.component.css"]
})
export class CreateTicketComponent implements OnInit {
  ticketTypes: ITicketProperty[];
  serviceTypes: ITicketProperty[];
  priorities: ITicketProperty[];
  statuses: ITicketProperty[];

  inputSubject: string;
  inputCustomerName: string;
  inputDescription: string;
  selectedPriority: string;
  selectedServiceType: string;
  selectedTicketType: string;
  selectedStatus: string;

  constructor(
    private ticketPropertyService: TicketPropertiesService,
    private ticketService: TicketService,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
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

  submitTicket() {
    let submittedTicket: ITicketRequest = {
      subject: this.inputSubject,
      customerName: this.inputCustomerName,
      description: this.inputDescription,
      priorityName: this.selectedPriority,
      serviceTypeName: this.selectedServiceType,
      ticketTypeName: this.selectedTicketType,
      statusName: this.selectedStatus,
      userName: "admin"
    };

    if (
      submittedTicket.subject &&
      submittedTicket.customerName &&
      submittedTicket.description &&
      submittedTicket.priorityName &&
      submittedTicket.serviceTypeName &&
      submittedTicket.ticketTypeName &&
      submittedTicket.statusName
    ) {
      this.ticketService.createTicket(submittedTicket).subscribe(response => {
        if (response.id) {
          this.toastrService.show("Ticket Created!", "Success", {
            status: "success"
          });
        }
      });
      this.closeWindow();
    } else {
      this.toastrService.show(
        "Make sure to fill out all the required fields!",
        "Warning",
        {
          status: "warning"
        }
      );
    }
  }

  minimizeWindow() {
    this.windowRef.minimize();
  }

  closeWindow() {
    this.windowRef.close();
  }
}
