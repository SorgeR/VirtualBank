using AccesaBankAPI.ModelDTOs.FriendDTOS;
using BankAPI.Models;

namespace BankAPI.Services.FriendService
{
    public interface IFriendsService
    {
        Friend CreateFriend(CreateFriendDTO createFriendDTO);

        Friend DeleteFriendByID(int friendshipID);

    }
}
