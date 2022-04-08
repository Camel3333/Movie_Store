import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  myForm: FormGroup;

  email: FormControl;
  password: FormControl;
  username: FormControl;
  registrationFailed: boolean = false;
  errorMsg: string = '';

  constructor(private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.username = new FormControl('', [Validators.required, Validators.maxLength(30)]);

    this.myForm = new FormGroup({
      'email': this.email,
      'password': this.password,
      'username': this.username
    });
  }

  async register(): Promise<void> {
    const { email, password, username } = this.myForm.value;
    const resp = await this.auth.register(email, username, password);
    if (resp.success)
      console.log(resp.msg);
    else {
      console.log("failed");
      console.log(resp.msg);
    }
  }

}
