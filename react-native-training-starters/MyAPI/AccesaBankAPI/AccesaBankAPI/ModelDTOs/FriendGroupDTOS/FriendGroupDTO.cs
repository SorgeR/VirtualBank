using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.FriendGroupDTOS
{
    public class FriendGroupDTO
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public int AdminId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
