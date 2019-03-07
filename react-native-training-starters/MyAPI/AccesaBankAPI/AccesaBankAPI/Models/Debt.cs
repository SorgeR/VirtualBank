using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Models
{
    public class Debt
    {
        public int Id;
        public int IdDebtor;
        public int IdCreator;
        public int IdBill;
        public double SumToPay;
        public bool Payed;

    }
}
