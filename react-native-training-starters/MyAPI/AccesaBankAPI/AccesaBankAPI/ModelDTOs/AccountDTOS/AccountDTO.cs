using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.AccountDTOS
{
    public class AccountDTO
    {

        public int Id { get; set; }
        public String IBAN { get; set; }
        [Required]
        public int UserId { get; set; }
        public Double Budget { get; set; }
        [Required]
        public String Currency { get; set; }
        [Required]
        public String Alias { get; set; }
    }
}
