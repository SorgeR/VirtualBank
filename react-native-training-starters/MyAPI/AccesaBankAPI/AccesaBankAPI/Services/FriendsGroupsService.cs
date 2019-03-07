using AccesaBankAPI.ModelDTOs;
using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using AccesaBankAPI.Models;
using AccesaBankAPI.Repository.UserRepository;
using AccesaBankAPI.RepositoryInterfaces;
using AccesaBankAPI.ServiceInterfaces;
using AutoMapper;
using BankAPI.Models;
using BankAPI.Services.UserService;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Services
{
    public class FriendsGroupsService:IFriendsGroupsService
    {
        private IFriendGroupRepository _friendGroupRepository;
        private IUserRepository _userRepository;
        private IUserService _userService;
        private IMapper _mapper;
        private List<FriendGroup> friendsGroups;

        public FriendsGroupsService(IFriendGroupRepository friendGroupRepository, IUserRepository userRepository, IUserService userService, IMapper mapper)
        {
            _friendGroupRepository = friendGroupRepository;
            _userRepository = userRepository;
            _userService = userService;
            _mapper = mapper;
            friendsGroups = _friendGroupRepository.GetAll();
        }

        public FriendGroupDTO CreateFriendGroup(FriendGroupDTO friendGroup)
        {
            User u = _userRepository.FindUser(friendGroup.AdminId);
            if(u==null)
            {
                throw new APIException("The user does not exist!", StatusCodes.Status404NotFound);
            }

            friendGroup.CreateDate = DateTime.Now;
            FriendGroup friendG = _mapper.Map<FriendGroup>(friendGroup);
            FriendGroup fg=_friendGroupRepository.Add(friendG);
            CreateMember(fg.Id, fg.AdminId);
            return friendGroup;
            
        }

        public GroupMemberDTO CreateMember(int idGroup, int idUser)
        {
            FriendGroup foundGroup = _friendGroupRepository.FindFullGroup(idGroup);
            User foundUser = _userRepository.FindUser(idUser);

            if(foundGroup==null)
            {
                throw new APIException("The group does not exist!", StatusCodes.Status404NotFound);
            }
           
            if(foundUser==null)
            {
                throw new APIException("The user does not exist!", StatusCodes.Status404NotFound);
            }
            GroupMemberDTO groupMembership = foundGroup.members.Where(x => x.UserId == idUser && x.GroupId == idGroup).FirstOrDefault();
            if (groupMembership == null)
            {
                _friendGroupRepository.AddMember(idGroup, idUser, DateTime.Now);
                return new GroupMemberDTO();
            }
            else
            {
                throw new APIException("The user is already a member!", StatusCodes.Status400BadRequest);
            }
            
        }

        public FriendGroupDTO DeleteFriendGroup(int id)
        {
            FriendGroup friendGroup = friendsGroups.Where(x => x.Id == id).FirstOrDefault();
            if(friendGroup==null)
            {
                throw new APIException("The friend group does not exist!", StatusCodes.Status404NotFound);
            }
            _friendGroupRepository.Delete(id);
            return _mapper.Map<FriendGroupDTO>(friendGroup);
        }

        public GroupMemberDTO DeleteMember(int id)
        {
            GroupMemberDTO groupMember = _friendGroupRepository.FindMember(id);
            if(groupMember==null)
            {
                throw new APIException("The membership does not exist!", StatusCodes.Status404NotFound);
            }
            _friendGroupRepository.DeleteMember(id);
            return groupMember;
        }

        public FriendGroupDTO FindGroup(int id)
        {
            FriendGroup friendGroup = _friendGroupRepository.Find(id);
            if (friendGroup == null)
            {
                throw new APIException("The friend group does not exist!", StatusCodes.Status404NotFound);
            }
            return _mapper.Map<FriendGroupDTO>(friendGroup);
        }

        public List<FriendGroupDTO> GetFriendGroups()
        {
            List<FriendGroupDTO> friendGroups=new List<FriendGroupDTO>();
            foreach(FriendGroup f in _friendGroupRepository.GetAll())
            {
                friendGroups.Add(_mapper.Map<FriendGroupDTO>(f));
            }
            return friendGroups;
        }

        public List<GroupMemberDTO> GetMembersOfGroup(int id)
        {
            FriendGroup friendGroup = _friendGroupRepository.FindFullGroup(id);
            if(friendGroup==null)
            {
                throw new APIException("The group was not found!", StatusCodes.Status404NotFound);
            }
            return friendGroup.members;
        }

        public List<GetUserDTO> GetNonMembersOfGroupFriendsWithUser(int userId,int groupId)
        {
            FriendGroup friendGroup = _friendGroupRepository.FindFullGroup(groupId);
            User user = _userRepository.FindFullUser(userId);
            List<GetUserDTO> notMembers = new List<GetUserDTO>();

            if (user==null)
            {
                throw new APIException("The user does not exist!", StatusCodes.Status404NotFound);
            }


            if (friendGroup == null)
            {
                throw new APIException("The friend group does not exist!", StatusCodes.Status404NotFound);
            }

            foreach(FriendUserDTO fud in user.Friends)
            {
                GroupMemberDTO gmd = friendGroup.members.Where(x => x.UserId == fud.UserId).FirstOrDefault();
                if(gmd==null)
                {
                    notMembers.Add(new GetUserDTO { FirstName=fud.FirstName,
                                                    Id=fud.UserId,
                                                    LastName=fud.LastName,
                                                    PhoneNumber=fud.PhoneNumber});
                }
            }
            return notMembers;
            
        }

        public FriendGroupDTO UpdateFriendGroup(FriendGroupDTO friendGroup)
        {
            FriendGroup friendG = _friendGroupRepository.Find(friendGroup.Id);
           
            if(friendG==null)
            {
                throw new APIException("The friend groups does not exist!", StatusCodes.Status404NotFound);
            }
            friendG = _mapper.Map<FriendGroup>(friendGroup);
            _friendGroupRepository.Update(friendG);
            return _mapper.Map<FriendGroupDTO>(friendG);
        }

        public List<FriendGroupDTO> GetGroupsOfUser(int id)
        {
            User user = _userRepository.FindFullUser(id);
            if(user==null)
            {
                throw new APIException("The user does not exist!", StatusCodes.Status404NotFound);
            }
            return _mapper.Map<List<FriendGroupDTO>>(user.FriendGroups);
        }
       
    }
}
