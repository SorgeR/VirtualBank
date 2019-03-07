using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.AccountDTOS
{
    public class GetAccountDTO
    {
        public int Id { get; set; }
        public String IBAN { get; set; }
        public Double Budget { get; set; }
        public String Currency { get; set; }
        public String Alias { get; set; }
    }
}
