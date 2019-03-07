using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.OperationDTOS
{
    public class GetTopUpDTO
    {
      
        public string AccountDestinationIBAN { get; set; }
        public string Alias { get; set; }
        public Double SumToTransfer { get; set; }
        public DateTime Date { get; set; }
    }
}
