import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUserDto } from './dtos/create-user.dto';
import { Observable, from, switchMap} from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrlUser = 'http://localhost:3000'; 
  private backendUrlMonitoring = 'http://localhost:3002'; 
  private currentlyLoggedUser : User =  new User('','','','',false);
  constructor(private http: HttpClient, private authService: AuthService) {}

  createUser(userDto: CreateUserDto): Observable<any> {
    return this.http.post(`${this.backendUrlUser}/users/register`, userDto);
  }

  setCurrentlyLoggedUser(user: User): void {
    this.currentlyLoggedUser = user;
  }

  getCurrentlyLoggedUser(): User {
    return this.currentlyLoggedUser;
  }

  login(email: string, password: string): Observable<{ access_token: string, user: User }> {
    const loginData = { email, password };
    return this.http.post<{ access_token: string, user: User }>(`${this.backendUrlUser}/users/login`, loginData)
    .pipe(
      tap(response => {
        const { access_token } = response;
        this.authService.setAccessToken(access_token); 
        console.log('access_token', access_token);
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
    });

    return this.http.get<User[]>(`${this.backendUrlUser}/users`, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
    });

    return from(
      this.http.delete(`http://localhost:3001/devices/clear-user-association/${userId}`,{ headers })
    ).pipe(
      switchMap(() => {
        return this.http.delete(`${this.backendUrlUser}/users/${userId}`, { headers });
      })
    );
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
    });
    return this.http.put<void>(`${this.backendUrlUser}/users/${id}`, updateUserDto, { headers });
  }
  
  getHistoricalEnergyConsumption(userId: string, selectedDay: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
    });
    return this.http.get<any>(`${this.backendUrlMonitoring}/measurement/historical-energy/${userId}/${selectedDay}`, { headers });
  }

}
