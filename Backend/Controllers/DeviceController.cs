using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;

namespace DeviceIdentifier.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly ILogger<DeviceController> _logger;

        public DeviceController(ILogger<DeviceController> logger)
        {
            _logger = logger;
        }

        public class DeviceInformation
        {
            public string Ip { get; set; }
            public string Fingerprint { get; set; }

            public string DeviceId { get; set; }
        }

        [HttpGet]
        public ActionResult<DeviceInformation> Get()
        {
            var response = new DeviceInformation
            { 
                Ip = ControllerContext.HttpContext.Connection.RemoteIpAddress.ToString(),
                Fingerprint = Request.Headers["fingerprint"],
                DeviceId = Request.Headers["device-id"]
            };
            return Ok(response);
        }
    }
}
