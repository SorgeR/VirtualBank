using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.FriendDTOS
{
    public class FriendUserDTO
    {

        public int FriendshipId { get; set; }
        public int UserId { get; set; }
        public String PhoneNumber { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
    }
}
