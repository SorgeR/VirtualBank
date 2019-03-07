using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.BillDTOS
{
    public class GetDebtorOfPersonDTO
    {
        public int UserId { get; set; }
        public string BillName { get; set; }
        public double SumToGet { get; set; }
        public int DebtorId { get; set; }
        public string DebtorFirstName { get; set; }
        public string DebtorLastName { get; set; }
    }
}
