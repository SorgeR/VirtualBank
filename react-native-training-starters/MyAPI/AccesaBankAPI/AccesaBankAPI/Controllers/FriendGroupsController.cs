using AccesaBankAPI.ModelDTOs;
using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using AccesaBankAPI.Models;
using AccesaBankAPI.ServiceInterfaces;
using BankAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AccesaBankAPI.Controllers
{
    [Route("api/friendgroups")]
    [ApiController]
    public class FriendGroupsController : ControllerBase
    {

        private IFriendsGroupsService _friendsGroupsService;

        public FriendGroupsController(IFriendsGroupsService friendsGroupsService)
        {
            _friendsGroupsService = friendsGroupsService;
        }

        [HttpPost()]
        public IActionResult CreateFriendGroup([FromBody]FriendGroupDTO friendGroup)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }
            try
            {
                FriendGroupDTO addedFriendGroup=_friendsGroupsService.CreateFriendGroup(friendGroup);

                return Ok(addedFriendGroup);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpDelete("{groupId}")]
        public IActionResult DeleteFriendGroup(int groupId)
        {
            try
            {
                FriendGroupDTO friendGroup = _friendsGroupsService.DeleteFriendGroup(groupId);
                return Ok(friendGroup);
            }
            catch(APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpPut()]
        public IActionResult UpdateFriendGroup([FromBody]FriendGroupDTO friendGroup)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }
            try
            {
                FriendGroupDTO friendG = _friendsGroupsService.UpdateFriendGroup(friendGroup);
                return Ok(friendG);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("{groupId}")]
        public IActionResult FindFriendGroup(int groupId)
        {
            try
            {
                FriendGroupDTO friendGroup = _friendsGroupsService.FindGroup(groupId);
                return Ok(friendGroup);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpPost("members/{groupId}/{userId}")]
        public IActionResult AddMemberToGroup(int groupId,int userId)
        {
            try
            {
                GroupMemberDTO newMembership = _friendsGroupsService.CreateMember(groupId, userId);
                return Ok(newMembership);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpDelete("members/{membershipId}")]
        public IActionResult DeleteMembership(int membershipId)
        {
            try
            {
                GroupMemberDTO oldMembership = _friendsGroupsService.DeleteMember(membershipId);
                return Ok(oldMembership);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("members/{groupId}")]
        public IActionResult GetMembersOfGroup(int groupId)
        {
            try
            {
                List<GroupMemberDTO> members = _friendsGroupsService.GetMembersOfGroup(groupId);
                return Ok(members);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("nonmembers/{userId}/{groupId}")]
        public IActionResult GetNonMembersOfGroupFromUserFriends(int userId,int groupId)
        {
            try
            {
                List<GetUserDTO> nonMembers = _friendsGroupsService.GetNonMembersOfGroupFriendsWithUser(userId, groupId);
                return Ok(nonMembers);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetGroupsOfUser(int userId)
        {
            try
            {
                List<FriendGroupDTO> groupsOfuser = _friendsGroupsService.GetGroupsOfUser(userId);
                return Ok(groupsOfuser);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }
    }
}