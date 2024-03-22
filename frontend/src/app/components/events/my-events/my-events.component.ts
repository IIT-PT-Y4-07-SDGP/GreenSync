import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  selectedButton: string = 'Participation'; // Default selected button
  
  selectButton(button: string) {
    this.selectedButton = button;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
