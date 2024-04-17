import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'console';
import { EventDetails } from 'src/app/interfaces/event';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './detailed-view-event.component.html'
})
export class DetailedViewEventComponent implements OnInit {
  event: EventDetails;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: EventDetails }, 
    private userService:UserService,
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
      userID: this.userService.getGeneralUser()?._id,
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

  isOrganizer(): boolean {
    return this.event.eventOrganizer === this.userService.getGeneralUser()?._id;
  }
}
