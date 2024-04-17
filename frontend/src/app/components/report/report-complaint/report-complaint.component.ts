import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { ReportService } from 'src/app/services/report.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-report-complaint',
  templateUrl: './report-complaint.component.html'
})
export class ReportComplaintComponent implements OnInit {

  private userDetails?: GeneralUser;
  reportForm: FormGroup;
  dialogRef: any;
  private destroy$: Subject<void> = new Subject();


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private reportService: ReportService
  )
  {
    this.reportForm = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {

    this.reportForm = this.fb.group({
      reportTitle: ['', [Validators.required]],
      reportLocation: ['', [Validators.required]],
      reportDescription: ['', [Validators.maxLength(1000)]],
    });
    this.userDetails = this.userService.getGeneralUser();
  }

  onSubmit() {

    if (this.reportForm.valid) {
      // Construct the data object in the required format
      const formData = {
        reportTitle: this.reportForm.value.reportTitle,
        reportLocation: this.reportForm.value.reportLocation,
        reportDescription: this.reportForm.value.reportDescription,
        reportAuthor: this.userDetails?._id,
        createdTimestamp: Date.now(),
      };
      const jsonData = JSON.stringify(formData);
      this.reportService.createComplaint(jsonData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
        next: response => 
        {
          alert("Your Complaint has been submitted successfully");
        },
        error: err => 
        {
          alert(err.error.error);
          console.error('Error:', err);
        }
      });
    }
  }

  onCancel() {
    // Close the dialog without saving
    this.dialogRef.close();
  }

}
