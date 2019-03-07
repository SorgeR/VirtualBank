using AccesaBankAPI.ModelDTOs.BillDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Models
{
    public class Bill
    {
        public int Id;
        public int IdCreator;
        public int PayedFromAccountId;
        public string Name;
        public string Description;
        public DateTime Date;
        public double Price;
        public List<GetDebtorDTO> Debitors;
        
    }
}
