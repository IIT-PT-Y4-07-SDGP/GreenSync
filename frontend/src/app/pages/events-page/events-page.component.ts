import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrganizeEventComponent } from 'src/app/components/events/organize-event/organize-event.component';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  public isOrganizeCompVisible: boolean = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClickOrganizeEvents(){
    this.isOrganizeCompVisible = !this.isOrganizeCompVisible;
    if (this.isOrganizeCompVisible) {
      this.openOrganizeEventDialog();
    }
  }

  openOrganizeEventDialog(): void {
    const dialogRef = this.dialog.open(OrganizeEventComponent, {
      height: '700px',
      width: '1000px', // Adjust the width as needed
      // Add any other configuration options for your dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOrganizeCompVisible = false;
      // Handle any data or actions after the dialog is closed
    });
  }
}