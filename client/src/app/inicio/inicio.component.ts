import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UserService]
})
export class InicioComponent implements OnInit {

  public identity;
  public token;

  constructor(private _userService:UserService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    if (this.identity === null) {
      this._router.navigate(['/']);
    }

    this.token = this._userService.getToken();
  }

  public cerrarSesion() {
    localStorage.clear();

    this._router.navigate(['/']);
  }
}
