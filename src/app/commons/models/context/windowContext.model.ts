import { ITicketProperty } from '../ticket/ticketProperty.model';
import { ITicketResponse } from '../ticket/ticketResponse.model';

export interface IWindowContext{
    ticket: ITicketResponse,
    priorities: ITicketProperty[],
    ticketTypes: ITicketProperty[],
    serviceTypes: ITicketProperty[],
    statuses: ITicketProperty[]
}