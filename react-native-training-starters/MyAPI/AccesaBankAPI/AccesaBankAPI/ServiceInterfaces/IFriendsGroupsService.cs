using AccesaBankAPI.ModelDTOs;
using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ServiceInterfaces
{
    public interface IFriendsGroupsService
    {
        FriendGroupDTO CreateFriendGroup(FriendGroupDTO friendGroup);

        FriendGroupDTO DeleteFriendGroup(int id);

        FriendGroupDTO UpdateFriendGroup(FriendGroupDTO friendGroup);

        FriendGroupDTO FindGroup(int id);

        List<FriendGroupDTO> GetFriendGroups();

        List<GetUserDTO> GetNonMembersOfGroupFriendsWithUser(int userId,int groupId);

        List<GroupMemberDTO> GetMembersOfGroup(int id);

        GroupMemberDTO CreateMember(int idGroup, int idUser);

        GroupMemberDTO DeleteMember(int id);

        List<FriendGroupDTO> GetGroupsOfUser(int id);
    }
}
