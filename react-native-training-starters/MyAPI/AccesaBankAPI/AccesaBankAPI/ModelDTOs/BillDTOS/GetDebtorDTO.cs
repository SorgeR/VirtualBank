using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.BillDTOS
{
    public class GetDebtorDTO
    {
        public int IdUser;
        public string UFirstName;
        public string ULastName;
        public double SumToPay;
        public bool Payed;
    }
}
