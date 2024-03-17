import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Event {
  _id: string;
  eventName: string;
  eventTime: string;
  eventLocation: string;
  eventDescription: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  event: Event;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: Event }) {
    this.event = data.event;
   }

  ngOnInit(): void {
  }

  formatDate(dateTime: string): string {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  onClickParticipateEvent(){
    
  }

}
