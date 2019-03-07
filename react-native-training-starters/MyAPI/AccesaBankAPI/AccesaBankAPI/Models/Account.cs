using AccesaBankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAPI.Models
{
    public class Account
    {
        public int Id { get; set; }
        public String IBAN { get; set; }
        public int UserId { get; set; }
        public Double Budget { get; set; }
        public String Currency { get; set; }
        public String Alias { get; set; }
        public List<Operation> Operations;
    }
}
