# DeviceID_WebApp
Some trials to uniquely identify a device using a Web Application

Basically while running on a Browser sandbox, an angular application would have some hard time to uniquely identify a device.

With that in mind, this POC makes 2 Approaches:
- Obtain a fingerprint via Fingerprintjs2: https://valve.github.io/fingerprintjs2/
  - FingerptintJS tries to generate a unique fingerprint, given the configuration of the browser by "comnbining" this features into a hash...
  - Pros:
    - Can be shared among apps: If you have multiple angular apps and you get the fingerprit, you will get the same id, without any need to save cookies or anything like that
    - Even if you clear the Browser history, you will get same fingerprint(as long no device settings were modified)
  - Cons
    - If you have two devices that are the same, configured on same way, you could get the same fingerprint
    - Browser dependent: If you open a different browser(Chrome, Safari, ...), you will get different fingerprints
    - As soon as the device has a setting changed(language, resolution,...) you will get another fingerprint
  
- Generate a GUID ourselves and save it to a cookie
  - There are some ways to create a GUID from javascript. As soon you generated it, just save it to a cookie
  - Pros:
    - Not many...
  - Cons:
    - Browser dependent: If you open a different browser(Chrome, Safari, ...), you will get different Ids as you save them to a cookie
    - Cannot be easily shared accross apps: Unlike fingerprintJs, if you have multiple angular apps you would need some iframe solution to share a cookiw, which is uggly and can be tricky to do...
    - Cookie dependent: If you clean your browser cache, or use an anonymous window, you will get different IDs
    
 So the idea would be to combine one of the approaches above(Fingerprint would be a good one) with the IP of the device, which we could get form the Backend...
    
  
