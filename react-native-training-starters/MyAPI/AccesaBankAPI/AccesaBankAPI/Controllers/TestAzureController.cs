using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AccesaBankAPI.Controllers
{
    [Route("api/[controller]")]


    [ApiController]
    public class TestAzureController : ControllerBase
    {
        private IConfiguration _configuration;

        public TestAzureController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpGet()]
        public IActionResult print()
        {
            //return Ok("Mos Craciun cu plete dalbe,\n A sosit de prin nameti\nSi aduce daruri multe\nLa fetite si baieti.\nMos Craciun, Mos Craciun.\nDin batrani se povesteste,\nCa - n toti anii negresit\nMos Craciun pribeag soseste\nNiciodata n - a lipsit.\nMos Craciun, Mos Craciun.\nMos Craciun cu plete dalbe,\nIncotro vrei sa apuci ?\nTi -as canta florile dalbe,\nDe la noi sa nu te duci.\nMos Craciun, Mos Craciun.");

            return Ok(this._configuration["appSettings:variabila"]);
        }
    }
}