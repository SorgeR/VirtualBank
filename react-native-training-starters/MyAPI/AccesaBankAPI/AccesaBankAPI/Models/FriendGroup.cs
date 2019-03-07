using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BankAPI.Models
{
    public class FriendGroup
    {
        
        public int Id { get; set; }
        public String Name { get; set; }
        public int AdminId { get; set; }
        public DateTime CreateDate { get; set; }
        public List<GroupMemberDTO> members;
    }
}
