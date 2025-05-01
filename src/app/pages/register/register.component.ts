import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { RegisterServiceService } from '../../shared/services/register/register-service.service';
import { Observable, Subscription } from 'rxjs';
import { Acceso, UserRegister } from '../../shared/interfaces/register';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formRegister: FormGroup;
  isLoading: boolean = false;
  userSubscription: Subscription | null = null;
  accessSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterServiceService
  ) {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  onSubmit() {
    const verifiForm = this.verifiForm();
    if(verifiForm){
      this.registerUser(this.formRegister.value);
    }
  }

  verifiForm(){
    if(this.formRegister.valid){  
      return true;
    }
    return false
  }

  registerUser(user:UserRegister){
    
  }
  registerAcceso(acceso:Acceso){
    
  }
}
