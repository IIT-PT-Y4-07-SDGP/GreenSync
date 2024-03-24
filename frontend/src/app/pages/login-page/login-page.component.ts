import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MC} from 'src/app/interfaces/MC';
import {PRC} from 'src/app/interfaces/PRC';
import {GeneralUser} from 'src/app/interfaces/generalUser';
import {LoginService} from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginFormGroup: FormGroup;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginFormGroup = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      userIdentity: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  validateCredential() {
    if (this.loginFormGroup.valid) {
      // Construct the data object in the required format
      const formData = {
        userIdentity: this.loginFormGroup.value.userIdentity,
        password: this.loginFormGroup.value.password,
      }
      // Convert registrationData to JSON format
      const jsonData = JSON.stringify(formData);
      this.loginService.loginUser(jsonData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: response => {
              const userRole = response.account.userRole;
              switch (userRole) {
                case 'GP':
                  const generalUser: GeneralUser = response;
                  this.loginService.setGeneralUser(generalUser);
                  // Navigate to user home page component
                  this.router.navigate(['/user-homepage']);
                  break;
                case 'PRC-ADMIN':
                  const PRC: PRC = response;
                  this.loginService.setPRC(PRC);
                  this.router.navigate(['/admin/dump-type']); // Navigate to PRC Admin Panel
                  break;
                case 'DRIVER':
                  const DRIVER: PRC = response;
                  this.loginService.setPRC(DRIVER);
                  this.router.navigate(['/prc-driver/dashboard']); // Navigate to PRC Driver Panel
                  break;
                case 'MC-ADMIN':
                  const MC: MC = response;
                  this.loginService.setMC(MC);
                  this.router.navigate(['/mc-admin-homepage']); // Navigate to MC-ADMIN Panel
                  break;
                default:
                  // Handle unexpected roles or errors
                  alert(`Unknown user role: ${userRole}`);
                  break;
              }
            },
            error: err => {
              alert("Login Failed :-(")
              console.error('Error:', err);
            }
          }
        );
    }
  }

}
