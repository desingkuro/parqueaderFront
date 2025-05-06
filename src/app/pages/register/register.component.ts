import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { RegisterServiceService } from '../../shared/services/register/register-service.service';
import { Subscription } from 'rxjs';
import { Acceso, UserRegister } from '../../shared/interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
})
export class RegisterComponent {
  formRegister: FormGroup;
  isLoading: boolean = false;
  userSubscription: Subscription | null = null;
  accessSubscription: Subscription | null = null;
  errorsInputs: string[] = [];

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterServiceService,
    private router: Router
  ) {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['1', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      documento: ['', Validators.required],
    });
  }

  onSubmit() {
    const verifiForm = this.verifiForm();
    if(verifiForm){
      const userData:UserRegister = {
        codRol: 1,
        documentoUsuario: this.formRegister.get("documento")?.value || "",
        nombresUsuario: this.formRegister.get("username")?.value || "",
        apellidosUsuario: this.formRegister.get("apellido")?.value || "",
        generoUsuario: this.formRegister.get("genero")?.value || "",
        fechaNacimientoUsuario: this.formRegister.get("fechaNacimiento")?.value || "",
        telefonoUsuario: this.formRegister.get("telefono")?.value || "",
      }
      this.registerUser(userData);
    }
  }

  verifiForm(){
    const jsonForm: any = this.formRegister.value;
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

  registerUser(user:UserRegister){
    this.isLoading = true;
    let myuuid = crypto.randomUUID();
    this.userSubscription = this.registerService.registerUser(user).subscribe({
      next: (response:any) => {
        this.isLoading = false;
        console.log(response?.objGrabado?.codUsuario);
        const acceso:Acceso = {
          correo: this.formRegister.get("email")?.value || "",
          clave: this.formRegister.get("password")?.value || "",
          codUsuario: response?.objGrabado?.codUsuario || 0,
          uuid: myuuid || "",
        }
        this.registerAcceso(acceso);
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }
  
  registerAcceso(acceso:Acceso){
    this.isLoading = true;
    this.accessSubscription = this.registerService.registerAcceso(acceso).subscribe({
      next: (response:any) => {
        if(response){
          this.isLoading = false;
          this.formRegister.reset();
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.accessSubscription) {
      this.accessSubscription.unsubscribe();
    }
  }
}
