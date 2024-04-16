import { Component, OnInit } from '@angular/core';
import { MC } from 'src/app/interfaces/MC';
import { MCService } from 'src/app/services/mc.service';

@Component({
  selector: 'app-mc-admin-homepage',
  templateUrl: './mc-admin-homepage.component.html',
  styleUrls: ['./mc-admin-homepage.component.scss']
})
export class McAdminHomepageComponent implements OnInit {
  public MC?: MC;
  constructor(private mcService: MCService) { }

  ngOnInit(): void {
    this.MC = this.mcService.getMC(); // Fetching MC data when the component initializes
  }

}
