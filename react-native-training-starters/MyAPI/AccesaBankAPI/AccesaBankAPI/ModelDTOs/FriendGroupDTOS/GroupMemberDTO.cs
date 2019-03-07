using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.FriendGroupDTOS
{
    public class GroupMemberDTO
    {
        public int MembershipId { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public String PhoneNumber { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
    }
}
