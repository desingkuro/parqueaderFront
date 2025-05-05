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
  errorsInputs:string[] = [];
  
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

  saveLocalStorage(token: string) {
    localStorage.setItem('token', token || '');
  }

  verifiForm():boolean{
    const jsonForm: any = this.formLogin.value;
    let validForm = true;
    if (jsonForm) {
      Object.keys(jsonForm)?.forEach((key: string) => {
        if (
          jsonForm[key] === '' ||
          jsonForm[key] === null ||
          jsonForm[key] === undefined
        ) {
          validForm = false;
          this.errorsInputs.push(key);
        }
      });
    }
    return validForm;
  }

  onSubmit(): void {
    if (this.verifiForm()) {
      const { correoAcceso, claveAcceso } = this.formLogin.value;
      this.loginService.login({ correoAcceso, claveAcceso }).subscribe({
        next: (response: any) => {
          this.saveLocalStorage(response?.token || '');
          this.formLogin.reset();
          this.errorsInputs = [];
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
