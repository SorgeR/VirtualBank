using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Models
{
    public class Operation
    {
        public int Id { get; set; }
        public int AccountSourceId { get; set; }
        public int AccountDestinationId { get; set; }
        public Double SumToTransfer { get; set; }
        public DateTime Date { get; set; }

    }
}
