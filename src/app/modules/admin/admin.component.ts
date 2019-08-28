import { Component, OnInit } from '@angular/core';
import { ISetting } from 'src/app/commons/models/settings/setting.model';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  settings: ISetting[]
  constructor(private settingServices: SettingsService) { }
  
  ngOnInit() {
    this.getSettings();
  }
  getSettings() {
    this.settingServices.getSettings().subscribe(response=>{
      this.settings = response;
      console.log(this.settings);
    });
  }

  toggle(checked: boolean, setting: ISetting){
    this.settings.find(s => s.name === setting.name).enabled = checked;
    console.log("clicked");
    console.log(checked);
    this.settingServices.updateSettings(setting).subscribe(response=>{
      console.log(response);
    });
  }

  submitSettings(){
    console.log(this.settings);
  }

}
