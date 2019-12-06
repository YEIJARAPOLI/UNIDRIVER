import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {

  public rePassword: string;
  public user: User;
  public errorMessage;

  public passwordType: string = 'password';
  public passwordShown: boolean = false;
  public iconEye: string = 'visibility_off';

  registerForm: FormGroup;

  constructor(private _userService:UserService, private _builder: FormBuilder, private _route: ActivatedRoute, private _router: Router) {
    this.user = new User ('', '', '', '', '', '');

    this.registerForm = this._builder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
      this.iconEye = 'visibility_off';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
      this.iconEye = 'visibility';
    }
  }

  public saveUser(values) {
    this.errorMessage = '';
    this.user = new User('', values.name, values.lastname, values.email, values.password, '');
    this.rePassword = values.rePassword;

    console.log(this.user);
    console.log(this.rePassword);

    if (this.user.password == this.rePassword) {
      this._userService.register(this.user).subscribe(
        response => {
          let user = response.user;
          this.user = user;

          if (!this.user._id) {
            alert('Error al registrarse, intentelo nuevamente');
          } else {
            localStorage.setItem('registro', 'true');
            this._router.navigate(['/']);
          }
        },
        error => {
          var errorMessage = <any> error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.errorMessage = body.message;
            console.log(error);
          }
        }
      );
    } else {
      this.errorMessage = 'Las claves deben coincidir';
      this.rePassword = null;
      values.rePassword = null;
    }
  }

}
