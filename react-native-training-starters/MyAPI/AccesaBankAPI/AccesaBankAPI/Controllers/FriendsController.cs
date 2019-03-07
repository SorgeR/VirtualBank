using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.Models;
using BankAPI.Models;
using BankAPI.Services.FriendService;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Route("api/friends")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private IFriendsService _friendService;

        public FriendsController(IFriendsService friendService)
        {
            _friendService = friendService;
        }

        [HttpPost()]
        public IActionResult CreateFriend([FromBody]CreateFriendDTO createFriendDTO)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }

            try
            {
                Friend friend = _friendService.CreateFriend(createFriendDTO);
                return Ok(friend);
            }
            catch (APIException e)
            {
                ErrorMessage error = new ErrorMessage { message = e.Message };
                return StatusCode(e.StatusCode, error);
            }
        }


        [HttpDelete("{friendshipId}")]
        public IActionResult DeleteFriendshipById(int friendshipId)
        {
            try
            {
                Friend f = _friendService.DeleteFriendByID(friendshipId);
                return Ok(f);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }

        }


    }
}