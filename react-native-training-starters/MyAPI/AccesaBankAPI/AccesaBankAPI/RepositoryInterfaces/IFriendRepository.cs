using BankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Repository.FriendRepository
{
    public interface IFriendRepository
    {

        void Add(Friend Friend);

        void Delete(int FriendId);

        List<Friend> GetFriends();

        Friend FindFriend(int FriendId);

    }
}
