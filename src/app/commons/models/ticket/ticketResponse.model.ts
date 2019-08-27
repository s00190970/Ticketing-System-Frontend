export interface ITicketResponse{
    id: string, 
    subject: string, 
    description: string, 
    customerName: string, 
    openDateTime: string,
    closeDateTime: string,
    ticketTypeName: string,
    serviceTypeName: string,
    statusName: string,
    priorityName: string
}