import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin:FormGroup;
  constructor(bulder:FormBuilder) {
    this.formLogin = bulder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      check: [false, [Validators.required]]
    })
   }

  ngOnInit(): void {

  }

  onSubmit():void{
    console.log(this.formLogin.value);
  }
}
