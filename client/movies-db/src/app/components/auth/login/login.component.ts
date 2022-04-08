import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  email: FormControl;
  password: FormControl;
  loginFailed: boolean = false;
  errorMsg: string = '';

  constructor(
    private auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.myForm = new FormGroup({
      'email': this.email,
      'password': this.password
    });

  }

  async login(): Promise<void> {
    if (!this.myForm.valid) {
      this.errorMsg = 'Wrong email or password';
      this.password.setValue('');
      this.loginFailed = true;
      return;
    }

    console.log('basic validation passed...');
    const { email, password } = this.myForm.value;
    try {
      const resp = await this.auth.login(email, password);
      this.router.navigate(['/movies']);
      console.log(resp);
    }
    catch (err) {
      console.error(err);
    }
  }

}
