using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ModelDTOs.FriendDTOS
{
    public class CreateFriendDTO
    {
        [Required]
        public int UserRequesterId { get; set; }
        [Required]
        public int UserAccepterId { get; set; }
    }
}
