import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginServicesService } from '../../shared/services/login/login-services.service';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formLogin: FormGroup;
  errorsInputs:string[] = [];
  isLoading: boolean = false;
  
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
      this.isLoading = true;
      this.loginService.login({ correoAcceso, claveAcceso }).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.saveLocalStorage(response?.token || '');
          this.formLogin.reset();
          this.errorsInputs = [];
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      });
    }
  }
}
