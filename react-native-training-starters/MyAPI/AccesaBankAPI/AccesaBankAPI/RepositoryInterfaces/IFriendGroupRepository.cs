using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using BankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.RepositoryInterfaces
{
    public interface IFriendGroupRepository
    {
        FriendGroup Add(FriendGroup friendGroup);

        void Delete(int id);

        void Update(FriendGroup friendGroup);

        FriendGroup Find(int id);

        List<FriendGroup> GetAll();

        FriendGroup FindFullGroup(int id);

        void AddMember(int friendGroupId, int userId, DateTime date);

        void DeleteMember(int id);

        GroupMemberDTO FindMember(int id);

    }
}
