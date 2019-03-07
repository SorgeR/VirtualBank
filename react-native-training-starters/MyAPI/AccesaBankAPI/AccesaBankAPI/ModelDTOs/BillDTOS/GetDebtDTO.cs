using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.BillDTOS
{
    public class GetDebtDTO
    {
        public int IdDebt;
        public int IdCreator;
        public string BillName;
        public double SumToPay;
        public string CreatorFirstName;
        public string CreatorLastName;
        public string CreatorIBAN;
        public int CreatorAccountId;
        public bool Payed;
    }
}
