import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

@NgModule({
  imports: [
    FormsModule
  ]
})

export class RegisterComponent implements OnInit {

  public rePassword: string;
  public user: User;

  constructor() {
    this.user = new User ('', '', '', '', '', '');
  }

  ngOnInit() {
  }

  public saveUser() {
    this.user.name = this.user.name.toUpperCase();
    this.user.lastname = this.user.lastname.toUpperCase();
  }

}
