using AccesaBankAPI.ModelDTOs.BillDTOS;
using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BankAPI.Models
{
    public class User
    {
        
        public int Id { get; set; }
        public String PhoneNumber { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Password { get; set; }


        public List<Account> Accounts { get; set; }
        public List<FriendGroup> FriendGroups { get; set; }
        public List<FriendUserDTO> Friends { get; set; }
        public List<Bill> Bills;
        public List<GetDebtDTO> Debts;
        public List<GetDebtorOfPersonDTO> Debtors;
        public List<Deposit> Deposits;
       
    }
}
