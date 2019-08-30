import { Component, OnInit } from "@angular/core";
import { NbWindowRef, NbToastrService } from "@nebular/theme";
import { ITicketRequest } from "src/app/commons/models/ticket/ticketRequest.model";
import { ISetting } from "src/app/commons/models/settings/setting.model";
import { SettingsService } from "src/app/core/services/settings.service";
import { ITicketProperty } from "src/app/commons/models/ticket/ticketProperty.model";
import { IWindowContext } from "src/app/commons/models/context/windowContext.model";
import { TicketService } from "src/app/core/services/ticket.service";
import { ITicketResponse } from "src/app/commons/models/ticket/ticketResponse.model";

@Component({
  selector: "app-edit-ticket",
  templateUrl: "./edit-ticket.component.html",
  styleUrls: ["./edit-ticket.component.css"]
})
export class EditTicketComponent implements OnInit {
  ticketToEdit: ITicketResponse;
  settings: ISetting[];
  canModifyCustomerName: boolean;
  canModifyServiceType: boolean;
  canModifyTicketType: boolean;

  ticketTypes: ITicketProperty[];
  serviceTypes: ITicketProperty[];
  priorities: ITicketProperty[];
  statuses: ITicketProperty[];

  windowContext: IWindowContext;

  constructor(
    protected windowRef: NbWindowRef,
    private settingServices: SettingsService,
    private ticketService: TicketService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.getSettings();
    this.windowContext = <IWindowContext>this.windowRef.config.context;
    this.ticketToEdit = this.windowContext.ticket;
    this.priorities = this.windowContext.priorities;
    this.ticketTypes = this.windowContext.ticketTypes;
    this.statuses = this.windowContext.statuses;
  }

  minimizeWindow() {
    this.windowRef.minimize();
  }

  closeWindow() {
    this.windowRef.close();
  }

  private getSettings() {
    this.settingServices.getSettings().subscribe(settings => {
      this.settings = settings;
      this.canModifyCustomerName = settings.find(
        s => s.name === "CanModifyCustomerName"
      ).enabled;
      this.canModifyServiceType = settings.find(
        s => s.name === "CanModifyServiceType"
      ).enabled;
      this.canModifyTicketType = settings.find(
        s => s.name === "CanModifyTicketType"
      ).enabled;
    });
  }

  private submitTicket() {
    if (
      this.ticketToEdit.subject &&
      this.ticketToEdit.customerName &&
      this.ticketToEdit.description &&
      this.ticketToEdit.priorityName &&
      this.ticketToEdit.serviceTypeName &&
      this.ticketToEdit.ticketTypeName &&
      this.ticketToEdit.statusName
    ) {
      this.ticketService.updateTicket(this.ticketToEdit).subscribe(response => {
        if (response.id) {
          this.toastrService.show("Ticket edited", "Success", {
            status: "success"
          });
        }
        this.closeWindow();
      });
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
}
