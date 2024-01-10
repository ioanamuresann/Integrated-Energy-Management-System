import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "./device.model";
import { CreateDeviceDto } from "./dtos/create-device.dto";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root',
})
  export class DeviceService {

    private backendUrlDevice = 'http://localhost:3001/devices'; 

    constructor(private http: HttpClient, private authService: AuthService) {}

    getAllDevices(): Observable<Device[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
      });
      return this.http.get<Device[]>(`${this.backendUrlDevice}`, { headers });
    }
    
    deleteDevice(deviceId: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
      });
      return this.http.delete(`${this.backendUrlDevice}/${deviceId}`, { headers });
    }
   
    createDevice(deviceDto: CreateDeviceDto): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
      });
        return this.http.post(`${this.backendUrlDevice}/create-device`, deviceDto, { headers });
    }

    associateUserWithDevice(userId: string, deviceId: string): Observable<boolean> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
      });
      return this.http.post<boolean>(`${this.backendUrlDevice}/associate-user/${userId}/${deviceId}`, null, { headers });
    }
  
    disconnectDeviceFromUser(deviceId: string): Observable<boolean> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
      });
      return this.http.delete<boolean>(`${this.backendUrlDevice}/disconnect-device/${deviceId}`, { headers });
    }
   
    getUserDevices(userId: string): Observable<Device[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
      });
      return this.http.get<Device[]>(`${this.backendUrlDevice}/user-devices/${userId}`, { headers });
    }

    updateDevice(deviceId: string, deviceDto: CreateDeviceDto): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAccessToken()}` || '',
      });
      return this.http.patch(`${this.backendUrlDevice}/${deviceId}`, deviceDto, { headers });
    }
    
  }