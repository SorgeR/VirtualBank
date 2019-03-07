using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs
{
    public class LoginUserDTO
    {
        [Required]
        public String PhoneNumber { get; set; }
        [Required]
        public String Password { get; set; }
    }
}
