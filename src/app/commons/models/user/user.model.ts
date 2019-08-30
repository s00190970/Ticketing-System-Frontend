import { ITicketResponse } from '../ticket/ticketResponse.model';

export interface IUser{
    id: string,
    userName: string,
    password: string,
    email: string,
    token: string,
    tickets: ITicketResponse[]
}