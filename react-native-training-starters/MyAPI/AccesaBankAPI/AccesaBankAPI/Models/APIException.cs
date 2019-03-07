using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Models
{
    public class APIException:Exception
    {
        public string Message { get; set; }
        public int StatusCode { get; set; }

        public APIException(string message, int statusCode)
        {
            Message = message;
            StatusCode = statusCode;
        }
    }
}
