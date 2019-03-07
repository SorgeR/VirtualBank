using AccesaBankAPI.ModelDTOs;
using AccesaBankAPI.ModelDTOs.AccountDTOS;
using AccesaBankAPI.ModelDTOs.Deposit;
using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using AccesaBankAPI.Models;
using AutoMapper;
using BankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Mappings
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<CreateUserDTO, User>().ForMember(u => u.Accounts, opt => opt.Ignore())
                                            .ForMember(u => u.Friends, opt => opt.Ignore())
                                            .ForMember(u => u.FriendGroups, opt => opt.Ignore());

            CreateMap<CreateFriendDTO, Friend>().ForMember(u => u.Members, opt => opt.Ignore());

            CreateMap<AccountDTO, Account>().ForMember(u => u.Operations, opt => opt.Ignore());

            CreateMap<FriendGroupDTO, FriendGroup>().ForMember(u => u.members, opt => opt.Ignore());

            CreateMap<GetUserDTO, FriendUserDTO>().ForMember(u => u.FriendshipId, opt => opt.Ignore());

            CreateMap<Deposit, CreateDepositDTO>().ForMember(u => u.IdAccount, opt => opt.Ignore());
        }
    }

}
