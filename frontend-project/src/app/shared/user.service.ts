import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto } from './dtos/create-user.dto';
import { Observable, from, switchMap } from 'rxjs';
import { User } from './user.model';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrlUser = 'http://localhost:3000'; 
  private backendUrlMonitoring = 'http://localhost:3002'; 
  private currentlyLoggedUser : User =  new User('','','','',false);
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    const loginData = { email, password };
    return this.http.post<User>(`${this.backendUrlUser}/users/login`, loginData);
  }
  
  createUser(userDto: CreateUserDto): Observable<any> {
    return this.http.post(`${this.backendUrlUser}/users/register`, userDto);
  }

  setCurrentlyLoggedUser(user: User): void {
    this.currentlyLoggedUser = user;
  }

  getCurrentlyLoggedUser(): User {
    return this.currentlyLoggedUser;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.backendUrlUser}/users`);
  }

  deleteUser(userId: string): Observable<any> {
    return from(
      this.http.delete(`http://localhost:3001/devices/clear-user-association/${userId}`)
    ).pipe(
      switchMap(() => {
        return this.http.delete(`${this.backendUrlUser}/users/${userId}`);
      })
    );
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Observable<void> {
    return this.http.put<void>(`${this.backendUrlUser}/users/${id}`, updateUserDto);
  }
  
  getHistoricalEnergyConsumption(userId: string, selectedDay: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrlMonitoring}/measurement/historical-energy/${userId}/${selectedDay}`);
  }

}
