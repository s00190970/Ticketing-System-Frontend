import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ITicketResponse } from "../../commons/models/ticket/ticketResponse.model";
import { baseUrl } from "../../commons/constants/constants";
import { Observable } from "rxjs";
import { ITicketRequest } from "src/app/commons/models/ticket/ticketRequest.model";
import { NbAuthService, NbAuthJWTToken } from "@nebular/auth";

@Injectable()
export class TicketService {
  apiUrl = baseUrl + "/Tickets";
  constructor(
    private httpClient: HttpClient,
    private authService: NbAuthService
  ) {}

  public getTickets(userId: string): Observable<ITicketResponse[]> {
    const httpOptions = { headers: this.prepareAuthHeader() };
    let getTicketsUrl = this.apiUrl + "/Users/" + userId;
    return this.httpClient.get<ITicketResponse[]>(getTicketsUrl, httpOptions);
  }

  public createTicket(ticket: ITicketRequest): Observable<ITicketResponse> {
    const httpOptions = { headers: this.prepareAuthHeader() };

    return this.httpClient.post<ITicketResponse>(
      this.apiUrl,
      ticket,
      httpOptions
    );
  }

  public updateTicket(ticket: ITicketResponse): Observable<ITicketResponse> {
    const httpOptions = { headers: this.prepareAuthHeader() };

    let ticketUrl = this.apiUrl + "/" + ticket.id;
    return this.httpClient.put<ITicketResponse>(ticketUrl, ticket, httpOptions);
  }

  private prepareAuthHeader(): HttpHeaders {
    let headers_object = new HttpHeaders();
    let token: string;

    this.authService.getToken().subscribe((storedToken: NbAuthJWTToken) => {
      token = storedToken.getValue();
    });

    headers_object = headers_object.append("Content-Type", "application/json");
    headers_object = headers_object.append("Authorization", "Bearer " + token);

    return headers_object;
  }
}
