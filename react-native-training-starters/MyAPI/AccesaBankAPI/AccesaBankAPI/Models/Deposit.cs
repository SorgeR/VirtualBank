using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Models
{
    public class Deposit
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public string Title { get; set; }
        public double InitialSum { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
