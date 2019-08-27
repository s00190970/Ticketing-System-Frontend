import { Component, OnInit } from '@angular/core';
import { TicketPropertiesService } from 'src/app/core/services/ticketProperties.service';
import { ITicketProperty } from 'src/app/commons/models/ticket/ticketProperty.model';
import { ITicketResponse } from 'src/app/commons/models/ticket/ticketResponse.model';
import { ITicketRequest } from 'src/app/commons/models/ticket/ticketRequest.model';
import { TicketService } from 'src/app/core/services/ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
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
  
  constructor(private ticketPropertyService: TicketPropertiesService, private ticketService: TicketService) { }

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

  submitTicket(){
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
    console.log("submitted ticket:");
    console.log(submittedTicket);
    console.log("returned ticket:");

    this.ticketService.createTicket(submittedTicket).subscribe(response => {
      console.log(response);
    })
  }

}
