import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css'],
  providers: [UserService]
})
export class AyudaComponent implements OnInit {

  public identity;
  public token: string;
  
  public title: string = '';
  public description: string = '';
  public help: Array<any>;

  helpForm: FormGroup;

  constructor(private _builder: FormBuilder, private _userService:UserService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.help = new Array<any>();

    this.helpForm = this._builder.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    if (this.identity === null) {
      this._router.navigate(['/']);
    }

    this.token = this._userService.getToken();

    console.log(this.identity);

    this.cargarAyudas();
  }

  private cargarAyudas() {
    this.help = new Array<any>();

    let hp = {
      title: 'Visión',
      description: 'En UNIDRIVE queremos ser lideres a nivel nacional e internacional ' +
                   'en el uso y consumo de transportes de plataforma, por ello aspiramos a que ' +
                   'en el 2022 puedan elegirnos todo tipo de personas'
    }

    this.help.push(hp);
  }

  public search(value) {
    console.log(value);
    for (let i = 0; i < this.help.length; i++) {
      console.log();
      if (value === this.help[i].title) {
        this.title = this.help[i].title;
        this.description = this.help[i].description;
        break;
      }
    }
  }
}
