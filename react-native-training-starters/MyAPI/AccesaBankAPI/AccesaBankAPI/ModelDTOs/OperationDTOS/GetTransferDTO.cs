using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.OperationDTOS
{
    public class GetTransferDTO
    {
        public int DestinationUserId { get; set; }
        public int SourceUserId { get; set; }
        public string AccountSourceIBAN { get; set; }
        public string AccountDestinationIBAN { get; set; }
        public Double SumToTransfer { get; set; }
        public DateTime Date { get; set; }
    }
}
