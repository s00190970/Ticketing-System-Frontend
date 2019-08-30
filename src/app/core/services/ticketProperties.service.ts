import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../../commons/constants/constants'
import { Observable } from 'rxjs';
import { ITicketProperty } from 'src/app/commons/models/ticket/ticketProperty.model';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';


@Injectable()
export class TicketPropertiesService{
    priorityUrl = baseUrl + "/Priorities";
    serviceTypeUrl = baseUrl + "/ServiceTypes";
    ticketTypeUrl = baseUrl + "/TicketTypes";
    statusUrl = baseUrl + "/Statuses";

    constructor(private httpClient: HttpClient, private authService: NbAuthService){

    }

    public getPriorities(): Observable<ITicketProperty[]> {
        const httpOptions = { headers: this.prepareHeader() };
        return this.httpClient.get<ITicketProperty[]>(this.priorityUrl, httpOptions);
    }

    public getTicketTypes(): Observable<ITicketProperty[]> {
        const httpOptions = { headers: this.prepareHeader() };
        return this.httpClient.get<ITicketProperty[]>(this.ticketTypeUrl, httpOptions);
    }

    public getServiceTypes(): Observable<ITicketProperty[]> {
        const httpOptions = { headers: this.prepareHeader() };
        return this.httpClient.get<ITicketProperty[]>(this.serviceTypeUrl, httpOptions);
    }

    public getStatuses(): Observable<ITicketProperty[]> {
        const httpOptions = { headers: this.prepareHeader() };
        return this.httpClient.get<ITicketProperty[]>(this.statusUrl, httpOptions);
    }

    private prepareHeader(): HttpHeaders {
        let headers_object = new HttpHeaders();
        let token: string;
    
        this.authService.getToken().subscribe((storedToken: NbAuthJWTToken) => {
          token = storedToken.getValue();
        });
    
        headers_object = headers_object.append('Content-Type', 'application/json');
        headers_object = headers_object.append('Authorization', `Bearer ${token}`);
    
        return headers_object;
      }
}