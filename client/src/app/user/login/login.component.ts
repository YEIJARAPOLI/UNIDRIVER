import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {

  public user: User;
  public identity;
  public token;
  public errorMessage;
  public registro;

  public passwordType: string = 'password';
  public passwordShown: boolean = false;
  public iconEye: string = 'visibility_off';

  singnupForm: FormGroup;

  constructor(private _userService:UserService, private _builder: FormBuilder,
              private _route: ActivatedRoute, private _router: Router) {
    this.user = new User('', '', '', '', '', '');

    this.singnupForm = this._builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.registro = this._userService.getUserRegister();
    if (this.identity === null) {
      this._router.navigate(['/']);
    } else {
      this._router.navigate(['/index']);
    }
    console.log('Soy registro: ' + this.registro);
    if (this.registro) {
      alert('Se acabo de generar un registro, por favor inicie sesión para continuar');
      localStorage.removeItem('registro');
    }

    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
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

  public singUp(values) {
    this.user = new User('', '', '', values.email, values.password, '');
    console.log(this.user);

    // conseguir los datos del usuario identificado
    this._userService.singUp(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        console.log(this.identity);

        if (!this.identity._id) {
          alert("El usuario no esta correctamente identificado");
        } else {
          // crear elemento en el localstorage para tener al usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));

          // conseguir el token para enviarlo a cada peticion http
          this._userService.singUp(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
      
              if (this.token.length <= 0) {
                alert("El token no se ha generado");
              } else {
                // crear elemento en el localstorage para tener el token disponible
                localStorage.setItem('token', token);
                localStorage.setItem('reload', 'true');
      
                console.log(token);
                console.log(identity);
                this._router.navigate(['/index']);
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
  }

}
