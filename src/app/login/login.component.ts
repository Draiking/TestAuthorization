import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../interface/user.interface';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title:string = 'Авторизация'

  user: UserInterface = {};

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async send() {
    const data: any = await this.userService.login(this.user.username, this.user.password);
    const tokenLoc: any = localStorage.setItem('token', data.token);
    if (!data.token) {
      console.log('ошибка')
    } else {
      this.router.navigateByUrl(`/user`)
    }
    
  }

}
