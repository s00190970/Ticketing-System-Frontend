import { Component, OnInit } from "@angular/core";
import { NbWindowRef } from "@nebular/theme";
import { ITicketRequest } from "src/app/commons/models/ticket/ticketRequest.model";
import { ISetting } from "src/app/commons/models/settings/setting.model";
import { SettingsService } from "src/app/core/services/settings.service";
import { ITicketProperty } from 'src/app/commons/models/ticket/ticketProperty.model';
import { IWindowContext } from 'src/app/commons/models/context/windowContext.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import { ITicketResponse } from 'src/app/commons/models/ticket/ticketResponse.model';

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
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.getSettings();
    this.windowContext = <IWindowContext>this.windowRef.config.context;
    console.log(this.windowContext)
    this.ticketToEdit = this.windowContext.ticket;
    this.priorities = this.windowContext.priorities;
    this.ticketTypes = this.windowContext.ticketTypes;
    this.statuses = this.windowContext.statuses;
    console.log(this.ticketToEdit);
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

  private submitTicket(){
    console.log("submitted ticket:");
    console.log(this.ticketToEdit);
    console.log("returned ticket:");
    this.ticketService.updateTicket(this.ticketToEdit).subscribe(response => {
      console.log(response);
      this.closeWindow();
    })
  }

}
