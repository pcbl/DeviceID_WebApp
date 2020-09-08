import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private Http:HttpClient) { }

  Check(){
    return this.Http.get("http://"+ window.location.hostname +":5000/device")
  }
}
