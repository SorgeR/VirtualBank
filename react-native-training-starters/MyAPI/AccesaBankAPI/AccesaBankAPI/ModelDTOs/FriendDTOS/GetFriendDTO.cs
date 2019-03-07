using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.FriendDTOS
{
    public class GetFriendDTO
    {
        public int Id { get; set; }
        public int UserRequesterId { get; set; }
        public int UserAccepterId { get; set; }
        public DateTime SinceDate { get; set; }
    }
}
