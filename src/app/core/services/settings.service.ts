import { Injectable } from "@angular/core";
import { baseUrl } from 'src/app/commons/constants/constants';
import { Observable } from 'rxjs';
import { ITicketProperty } from 'src/app/commons/models/ticket/ticketProperty.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISetting } from 'src/app/commons/models/settings/setting.model';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class SettingsService{
    apiUrl = baseUrl + "/Settings";

    constructor(private httpClient: HttpClient, private authService: NbAuthService) { }

    public getSettings(): Observable<ISetting[]> {
        const httpOptions = { headers: this.prepareHeader() };
        return this.httpClient.get<ISetting[]>(this.apiUrl, httpOptions);
    }

    public updateSettings(setting: ISetting): Observable<ISetting> {
        const httpOptions = { headers: this.prepareHeader() };
        const settingUrl = this.apiUrl + "/" + setting.id;
        return this.httpClient.put<ISetting>(settingUrl, setting, httpOptions);
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