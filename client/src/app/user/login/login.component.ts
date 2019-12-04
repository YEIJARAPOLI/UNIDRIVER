import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  singnupForm: FormGroup;

  constructor(private _userService:UserService, private _builder: FormBuilder) {
    this.user = new User('', '', '', '', '', '');

    this.singnupForm = this._builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
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
      
                console.log(token);
                console.log(identity);
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
