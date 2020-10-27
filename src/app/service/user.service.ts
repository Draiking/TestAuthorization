import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userChange = new Subject()

  constructor(
    private httpClient: HttpClient
  ) { }


  login(username: string, password: string) {
    return this.httpClient.post(`${environment.apiUrl}/api-token-auth/`, { username, password }).toPromise();
  }

  registration(user: any) {
    return this.httpClient.post(`${environment.apiUrl}/api/v1/users/`, {...user}).toPromise();
  }

  getUser() {
    return this.httpClient.get(`${environment.apiUrl}/api/v1/users/`).toPromise();
  }
  updateUser(id: any, user: any) {
    return this.httpClient.put(`${environment.apiUrl}/api/v1/users/${id}/`, {...user}).toPromise();
  }
 
}