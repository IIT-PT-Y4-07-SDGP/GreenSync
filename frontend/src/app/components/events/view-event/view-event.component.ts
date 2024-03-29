import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'console';
import { EventDetails } from 'src/app/interfaces/event';
import { EventService } from 'src/app/services/event.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  event: EventDetails;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: EventDetails }, 
    private loginService:LoginService,
    private eventService: EventService
  ) {
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
    const params = {
      userID: this.loginService.getGeneralUser()?._id,
      eventID: this.event._id
    }
    this.eventService.registerUserToEvent(params).subscribe({
      next: res => {
        alert(res.message)
      },
      error: err => {
        console.log(err);
        alert(err.error);
      }
    })
  }
}
