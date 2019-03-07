using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.BillDTOS
{
    public class PayDebtDTO
    {
        [Required]
        public int idDebt;
        [Required]
        public double sumToPay;
        [Required]
        public int idAccountSource;
        [Required]
        public int idAccountDestination;
    }
}
