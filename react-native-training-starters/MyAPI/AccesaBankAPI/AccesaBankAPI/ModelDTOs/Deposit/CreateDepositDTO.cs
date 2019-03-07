using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.Deposit
{
    public class CreateDepositDTO
    {
        [Required]
        public int IdAccount { get; set; }
        [Required]
        public int IdUser { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public double InitialSum { get; set; }
    }
}
