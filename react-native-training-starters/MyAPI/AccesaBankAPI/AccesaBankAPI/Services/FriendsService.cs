using System;
using System.Collections.Generic;
using System.Linq;
using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.Models;
using AccesaBankAPI.Repository.FriendRepository;
using AccesaBankAPI.Repository.UserRepository;
using AutoMapper;
using BankAPI.Models;
using BankAPI.Services.UserService;
using Microsoft.AspNetCore.Http;

namespace BankAPI.Services.FriendService
{
    public class FriendsService : IFriendsService
    {

      
        private IFriendRepository _friendRepository;
        private IUserRepository _userRepository;
        private IMapper _mapper;
        private List<Friend> _friends;

        public FriendsService(IUserService userService, IFriendRepository friendRepository, IUserRepository userRepository,IMapper mapper)
        {
       
            _friendRepository = friendRepository;
            _userRepository = userRepository;
            _friends = friendRepository.GetFriends();
            _mapper = mapper;
        }

        public Friend CreateFriend(CreateFriendDTO createFriendDTO)
        {
            Friend friend = _mapper.Map<Friend>(createFriendDTO);
            friend.SinceDate = DateTime.Now;
            Friend foundFriend = _friends.Where(f => f.UserAccepterId == friend.UserAccepterId && f.UserRequesterId == friend.UserRequesterId).FirstOrDefault();

            if (foundFriend != null)
            {
                throw new APIException("This friendship already exists!", StatusCodes.Status409Conflict);
            }
            else
            {
                _friendRepository.Add(friend);
                return friend;
            }

        }

        public Friend DeleteFriendByID(int friendshipID)
        {
            Friend friend = _friendRepository.FindFriend(friendshipID);
            if (friend == null)
            {
                throw new APIException("The friendship does not exist!", StatusCodes.Status404NotFound);
            }
            else
            {
                _friendRepository.Delete(friendshipID);
                return friend;
            }
        }

        
    }
}
