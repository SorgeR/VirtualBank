using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.OperationDTOS
{
    public class GetBudgetForStatistics
    {
        public DateTime Date { get; set; }
        public double TotalSum { get; set; }
    }
}
