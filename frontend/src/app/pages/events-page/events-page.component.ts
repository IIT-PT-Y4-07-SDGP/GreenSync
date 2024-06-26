import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrganizeEventComponent } from 'src/app/popups/organize-event/organize-event.component';
import { DetailedViewEventComponent } from 'src/app/popups/detailed-view-event/detailed-view-event.component';
import { EventDetails } from 'src/app/interfaces/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  public events: EventDetails[] = [];
  pagedEvents: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(public dialog: MatDialog, private eventServices: EventService) { }

  public imagePaths: string[] = [
    'app/assets/event-list-img-1.jpg',
    'app/assets/event-list-img-2.jpg',
    'app/assets/event-list-img-3.jpg',
    'app/assets/event-list-img-4.jpg',
    'app/assets/event-list-img-5.jpg',
    'app/assets/event-list-img-6.jpg',
    'app/assets/event-list-img-7.jpg',
    'app/assets/event-list-img-8.jpg',
    'app/assets/event-list-img-9.jpg',
    'app/assets/event-list-img-10.jpg',
  ];

  ngOnInit(): void {
    this.fetchEvents();
    this.totalPages = Math.ceil(this.events.length / this.pageSize);
    this.loadPage();
  }

  onClickOrganizeEvents() {
    this.openOrganizeEventDialog();
  }

  openOrganizeEventDialog(): void {
    const dialogRef = this.dialog.open(OrganizeEventComponent, {
      height: '600px',
      width: '1000px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  fetchEvents() {
    this.eventServices.getAllEvents().subscribe(
      (events) =>{
        // Assign the retrieved events to the component property
        this.events = events.map(event => ({
          _id: event._id,
          eventName: event.eventName,
          eventTime: event.eventTime,
          eventLocation: event.eventLocation,
          eventDescription: event.eventDescription,
          eventOrganizer: event.eventOrganizer,
          eventParticipant: event.eventParticipant,
          eventToken: event.eventToken,
          eventStatus: event.eventStatus,
          createdAt: event.createdAt,
          updatedAt: event.updatedAt,
          __v: event.__v
        }));
      }
    );
  }

  formatDate(dateTime: string): string {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

  // Helper function to format time
  formatTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  onCardClick(event: EventDetails, index: number) {
    this.openViewEventDialog(event, index);
  }

  openViewEventDialog(selectedEvent: EventDetails, index: number) {
    const dialogRef = this.dialog.open(DetailedViewEventComponent, {
      height: '300px',
      width: '600px',
      data: { event: selectedEvent, imagePath: this.imagePaths }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }


  loadPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.events.length);
    this.pagedEvents = this.events.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage();
    }
  }
}