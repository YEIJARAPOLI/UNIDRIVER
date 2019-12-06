import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CreditCardService } from '../services/credit_card.service';
import { UserService } from '../services/user.service';
import { CreditCard } from 'src/app/models/credit_card';
import { User } from '../models/user';

declare var $: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
  providers: [CreditCardService, UserService]
})
export class PagosComponent implements OnInit, OnChanges {
  
  public identity;
  public token: string;

  public agregandoMedioPago: boolean;
  public numeroTarjeta: string = '';
  public fechaTj: string = '';
  public urlImg: string = '../../assets/img/';
  public imagenFranquicia: string = '';
  public errorMessage;

  public creditCard: CreditCard;
  public creditCards: Array<CreditCard>;

  public user: User;

  tarjetForm: FormGroup;

  constructor(private _creditCardService:CreditCardService,
              private _userService:UserService,
              private _builder: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.creditCard = new CreditCard('', '', '', '', '', '', '');
    this.creditCards = new Array<CreditCard>();

    this.tarjetForm = this._builder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      date: ['', Validators.required],
      cvv: ['', Validators.required],
      franchise: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    if (this.identity === null) {
      this._router.navigate(['/']);
    }

    this.token = this._userService.getToken();

    console.log(this.identity);

    this.listCreditCards();
  }

  ngOnChanges() {
  }

  private listCreditCards() {
    this.creditCards = new Array<CreditCard>();

    this._creditCardService.getCreditCards(this.identity, this.token).subscribe(
      response => {
        console.log(response);
        this.creditCards = response.creditCards;
        console.log(this.creditCards);

        if (this.creditCards.length > 0) {
          this.agregandoMedioPago = false;

          for (let i = 0; i < this.creditCards.length; i++) {
            if (this.creditCards[i].number.substring(0, 1) == '4') {
              this.creditCards[i].franchise = 'visa.png';
            } else if (this.creditCards[i].number.substring(0, 1) == '5') {
              this.creditCards[i].franchise = 'mastercard.png';
            } else if (this.creditCards[i].number.substring(0, 1) == '3') {
              this.creditCards[i].franchise = 'amex.png';
            }

            this.creditCards[i].number = '**** **** **** ' +
                                         this.creditCards[i].number.substr(this.creditCards[i].number.length - 4,
                                                                           this.creditCards[i].number.length);
          }
        } else {
          this.agregandoMedioPago = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public agregarMetodoPago() {
    this.agregandoMedioPago = true;
  }

  public cancelarMetodoPago() {
    this.agregandoMedioPago = false;
  }

  public validarNumeroTarjeta(value) {
    this.numeroTarjeta = value;

    if (value.substring(0, 1) == '4') {
      this.imagenFranquicia = 'visa.png';
    } else if (value.substring(0, 1) == '5') {
      this.imagenFranquicia = 'mastercard.png';
    } else if (value.substring(0, 1) == '3') {
      this.imagenFranquicia = 'amex.png';
    } else {
      this.imagenFranquicia = '';
    }

    if (value.substring(0, 1) == '4' || value.substring(0, 1) == '5') {
      if (this.numeroTarjeta.length == 4 || this.numeroTarjeta.length == 9 || this.numeroTarjeta.length == 14) {
        this.numeroTarjeta = this.numeroTarjeta + ' ';
      }
    } else if (value.substring(0, 1) == '3') {
      if (this.numeroTarjeta.length == 4 || this.numeroTarjeta.length == 11) {
        this.numeroTarjeta = this.numeroTarjeta + ' ';
      } else if (this.numeroTarjeta.length > 17) {
        let nuevo = this.numeroTarjeta.substring(0, 17);
        this.numeroTarjeta = nuevo;
      }
    }
  }

  public validarFechaTj(value) {
    this.fechaTj = value;

    if (this.fechaTj.length == 2) {
      this.fechaTj = this.fechaTj + '/';
    }
  }

  public saveCreditCard(values) {
    this.errorMessage = '';

    this.creditCard = new CreditCard('', values.name, this.numeroTarjeta, this.fechaTj, values.cvv, '', this.identity._id);

    this._creditCardService.register(this.creditCard).subscribe(
      response => {
        let creditCard = response.creditCard;
          this.creditCard = creditCard;

          if (!this.creditCard._id) {
            alert('Error al agregar la nueva tarjeta');
          } else {
            this.listCreditCards();
            this.agregandoMedioPago = false;
            this.tarjetForm.reset();
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
