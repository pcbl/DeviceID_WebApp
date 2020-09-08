import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as Fingerprint2 from 'fingerprintjs2';
import { DeviceService } from './device.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  deviceid = 'not detected';
  fingerprint = 'not detected';
  serverResponse = '';
  usedComponents:Array<string> = [];
  constructor(private cdRef:ChangeDetectorRef, private service:DeviceService) {}

  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  ngOnInit()    { 
  /*  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
      return;
    }
    
    // List cameras and microphones.
    
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        console.log(JSON.stringify(device));
      });
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });*/

    this.deviceid = localStorage.getItem("device-id");
    if(!this.deviceid)
    {
      this.deviceid = this.getUniqueId(4);
      localStorage.setItem("device-id",this.deviceid);
    }
    
    //Not using window.requestIdleCallback as it is not supported on Safari...
    setTimeout(()=> {
        var options = {
    //        excludes: {userAgent: true, language: true}
        }
        Fingerprint2.get(options,(components) => {
          console.log(components); // an array of components: {key: ..., value: ...}    
          this.usedComponents = [];
          components.map((pair) => { 
            var line = pair.key+": "+pair.value;
            this.usedComponents.push(line);
          });
          this.fingerprint = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
          localStorage.setItem("fingerprint",this.fingerprint);
          
          //Not sure why, the bind was not updating automatically, so we force it....
          this.cdRef.detectChanges();
        });
      }, 500);
    }

    MakeRequest()
    {
      this.service.Check().subscribe((data:any)=>{this.serverResponse=JSON.stringify(data);})
    }
}
