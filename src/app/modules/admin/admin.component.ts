import { Component, OnInit } from "@angular/core";
import { ISetting } from "src/app/commons/models/settings/setting.model";
import { SettingsService } from "src/app/core/services/settings.service";
import { NbToastrService, NbPosition } from "@nebular/theme";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  settings: ISetting[];
  constructor(
    private settingServices: SettingsService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.getSettings();
  }
  getSettings() {
    this.settingServices.getSettings().subscribe(response => {
      this.settings = response;
    });
  }

  toggle(checked: boolean, setting: ISetting) {
    this.settings.find(s => s.name === setting.name).enabled = checked;
    this.settingServices.updateSettings(setting).subscribe(response => {
      this.toastrService.show(
        `${response.name} is set to ${response.enabled}`,
        "Setting updated",
        { status: "success" }
      );
    });
  }
}
