import { Component, OnInit, NgZone } from '@angular/core';
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
  public reload;

  constructor(private _userService:UserService, private _route: ActivatedRoute, private _router: Router,
              private zone: NgZone) { }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.reload = this._userService.getReload();
    if (this.identity === null) {
      this._router.navigate(['/']);
    }

    this.token = this._userService.getToken();
    this.reloadPage();
  }

  private reloadPage() { //click handler or similar
    if (this.reload) {
      location.reload();
      localStorage.removeItem('reload');
      localStorage.setItem('reload', 'false');
      localStorage.setItem('reload', '0');
    }
  }

  public cerrarSesion() {
    localStorage.clear();

    this._router.navigate(['/']);
    localStorage.setItem('reload', 'true');
  }
}
