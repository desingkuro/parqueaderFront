import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginServicesService } from '../../shared/services/login/login-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formLogin: FormGroup;
  constructor(
    bulder: FormBuilder,
    private loginService: LoginServicesService,
    private router: Router
  ) {
    this.formLogin = bulder.group({
      correoAcceso: ['', [Validators.required, Validators.email]],
      claveAcceso: ['', [Validators.required]],
      check: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  saveLocalStorage(token:string){
    localStorage.setItem('token', token || '');
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
      const { correoAcceso, claveAcceso } = this.formLogin.value;
      this.loginService.login({ correoAcceso, claveAcceso }).subscribe({
        next: (response: any) => {
          this.saveLocalStorage(response?.token || '');
          this.formLogin.reset();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
