using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BankAPI.Models
{
    public class Friend
    {
        public int Id { get; set; }
        public int UserRequesterId { get; set; }
        public int UserAccepterId { get; set; }
        public DateTime SinceDate { get; set; }
        public List<User> Members { get; set; }
    }
}
