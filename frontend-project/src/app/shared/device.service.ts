import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "./device.model";
import { CreateDeviceDto } from "./dtos/create-device.dto";

@Injectable({
    providedIn: 'root',
})
  export class DeviceService {

    private backendUrlDevice = 'http://localhost:3001/devices'; 
   // private currentlyLoggedUser : User =  new User('','','','',false);
    constructor(private http: HttpClient) {}

    getAllDevices(): Observable<Device[]> {
      return this.http.get<Device[]>(`${this.backendUrlDevice}`);
    }
    
    deleteDevice(deviceId: string): Observable<any> {
      return this.http.delete(`${this.backendUrlDevice}/${deviceId}`);
    }
   
    createDevice(deviceDto: CreateDeviceDto): Observable<any> {
        return this.http.post(`${this.backendUrlDevice}/create-device`, deviceDto);
    }

    associateUserWithDevice(userId: string, deviceId: string): Observable<boolean> {
      return this.http.post<boolean>(`${this.backendUrlDevice}/associate-user/${userId}/${deviceId}`, null);
    }
  
    disconnectDeviceFromUser(deviceId: string): Observable<boolean> {
      return this.http.delete<boolean>(`${this.backendUrlDevice}/disconnect-device/${deviceId}`);
    }
   
    getUserDevices(userId: string): Observable<Device[]> {
      return this.http.get<Device[]>(`${this.backendUrlDevice}/user-devices/${userId}`);
  }
    
  }