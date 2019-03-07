using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs
{
    public class GetUserDTO
    {
        public int Id { get; set; }
        public String PhoneNumber { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
    }
}
