using AccesaBankAPI.ModelDTOs;
using AccesaBankAPI.ModelDTOs.AccountDTOS;
using AccesaBankAPI.ModelDTOs.BillDTOS;
using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using AccesaBankAPI.ModelDTOs.OperationDTOS;
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

namespace BankAPI.Services
{
    public class UsersService:IUserService
    {
      
        private IUserRepository _userRepository;
        private IAccountRepository _accountRepository;
        private IBillRepository _billRepository;
        private IAccountService acountService;
        private IMapper _mapper;

        public UsersService(IUserRepository userRepository, 
                            IAccountRepository accountRepository,
                            IBillRepository billRepository,
                            IAccountService acountService, 
                            IMapper mapper)
        {
            _userRepository = userRepository;
            _accountRepository = accountRepository;
            _billRepository=billRepository;
            this.acountService = acountService;
            _mapper = mapper;
        }

        public List<GetUserDTO> GetUsers()
        {
            IList<User> users = _userRepository.GetUsers();

            List<GetUserDTO> usersDTOs = _mapper.Map<List<GetUserDTO>>(users);
            return usersDTOs;
        }
     
        public GetUserDTO CreateUser(CreateUserDTO createUserDTO)
        {
            try
            {
                User user = this.GetUserByPhoneNumber(createUserDTO.PhoneNumber);
                
               
            }
            catch (APIException ex)
            {

                User u = _mapper.Map<User>(createUserDTO);
                _userRepository.Add(u);
                return _mapper.Map<GetUserDTO>(u);
            }
            throw new APIException("The phone number already exists!", StatusCodes.Status409Conflict);
        }

        public GetUserDTO GetUserById(int id)
        {
            User user = _userRepository.FindUser(id);
            if (user == null)
            {
                throw new APIException("The user does not exist!", 404);
            }
            else
            {
                var userDto = _mapper.Map<GetUserDTO>(user);
                return userDto;
            }
        }

        public User GetUserByPhoneNumber(string phoneNumber)
        {
            User user = _userRepository.GetUsers().Where(u => u.PhoneNumber == phoneNumber).FirstOrDefault();
            if (user == null)
            {
                throw new APIException("The user does not exist!", 404);
            }
            else
            {
                return user;
            }
        }

        public GetUserDTO GetUserDTOByPhoneNumber(string phoneNumber)
        {
            try
            {
                User user = GetUserByPhoneNumber(phoneNumber);
                return _mapper.Map<GetUserDTO>(user);
            }
            catch (APIException ex) {
                throw ex;
            }
           
        }

        public GetUserDTO LoginUser(LoginUserDTO loginUserDTO)
        {

            try
            {
                User u = this.GetUserByPhoneNumber(loginUserDTO.PhoneNumber);
                if (u.Password == loginUserDTO.Password)
                {
                    return _mapper.Map<GetUserDTO>(u);
                }
                else
                {
                    throw new APIException("Incorrect password!", 401);
                }
            }
            catch(APIException ex)
            {
                throw ex;
            }
           
        }

        public User GetFullUser(int id)
        {
            User user = _userRepository.FindFullUser(id);
            if (user == null)
            {
                throw new APIException("The user does not exist!", 404);
            }
            else
            {
                return user;
            }
        }

        public List<FriendUserDTO> GetFriendsOfUser(int id)
        {
            try
            {
                User user = _userRepository.FindFullUser(id);
                List<FriendUserDTO> friends = user.Friends;
                return friends;
            }
            catch(APIException ex)
            {
                throw ex;
            }
        }

        public List<GetAccountDTO> GetAccountsOfUser(int id)
        {
            try
            {
                User user = _userRepository.FindFullUser(id);
                List<GetAccountDTO> accounts = _mapper.Map<List<GetAccountDTO>>(user.Accounts);
                return accounts;
            }
            catch (APIException ex)
            {
                throw ex;
            }
        }

        public List<FriendGroupDTO> GetFriendGroupOfUser(int id)
        {
            try
            {
                User user = _userRepository.FindFullUser(id);
                List<FriendGroupDTO> friendGroups = _mapper.Map<List<FriendGroupDTO>>(user.FriendGroups);
                return friendGroups;
            }
            catch (APIException ex)
            {
                throw ex;
            }
        }

        public List<GetUserDTO> GetUsersWhichAreNotFriendsOfUser(int id)
        {
            List<GetUserDTO> notFriends = GetUsers();
            List<FriendUserDTO> friends = this.GetFriendsOfUser(id);
            foreach(FriendUserDTO f in friends)
            {
                GetUserDTO user = notFriends.Where(nf => nf.Id == f.UserId).FirstOrDefault();
                if (user != null)
                {
                    notFriends.Remove(user);
                }
            }
            return notFriends;
        }

        public List<Operation> GetOperationsForAllAccountsOfUser(int id)
        {
            User user = this.GetFullUser(id);
            if (user == null)
            {
                throw new APIException("the user could not be found", StatusCodes.Status404NotFound);
            }
            List<Operation> operations = new List<Operation>();

            user.Accounts.ForEach(x =>
            {
                Account newAccount = this._accountRepository.FindFull(x.Id);
                newAccount.Operations.ForEach(z =>
                {
                    operations.Add(z);
                });

            });
            return operations;
        }

        private int GetOwnerOfAccount(int id)
        {
            User fullUser = new User();
            foreach(User u in this._userRepository.GetUsers())
            {
                 fullUser = this._userRepository.FindFullUser(u.Id);
                if (fullUser.Accounts.Where(x => x.Id == id).FirstOrDefault() != null)
                {
                    return fullUser.Id;
                }
            }
            throw new APIException("the account does not have an owner", StatusCodes.Status404NotFound);
        }

        public List<GetTopUpDTO> GetTopUpOperationsOfUser(int id)
        {
            List<Operation> toupOperations =this.GetOperationsForAllAccountsOfUser(id)
                                            .Where(x => x.AccountSourceId == 0 && 
                                                        GetOwnerOfAccount(x.AccountDestinationId) == id)
                                            .ToList();
            List<GetTopUpDTO> topUps = new List<GetTopUpDTO>();
            foreach(Operation x in toupOperations) { 
                GetAccountDTO destination;
                destination = this.acountService.GetAccountById(x.AccountDestinationId);
                topUps.Add(new GetTopUpDTO
                {
                    AccountDestinationIBAN = destination.IBAN,
                    Alias=destination.Alias,
                    Date = x.Date,
                    SumToTransfer = x.SumToTransfer,
                });

            }
            return topUps;
           
        }

        public List<GetTransferDTO> GetTransferOperationsOfUser(int id)
        {
            List<GetTransferDTO> transfers = new List<GetTransferDTO>();

            this.GetOperationsForAllAccountsOfUser(id)
                                            .ForEach(x =>
                                            {
                                                if (x.AccountSourceId!=0 && GetOwnerOfAccount(x.AccountSourceId) == id)
                                                {
                                                    transfers.Add(new GetTransferDTO
                                                    {
                                                        SourceUserId = id,
                                                        DestinationUserId = GetOwnerOfAccount(x.AccountDestinationId),
                                                        AccountSourceIBAN=this.acountService.GetAccountById(x.AccountSourceId).IBAN,
                                                        AccountDestinationIBAN=this.acountService.GetAccountById(x.AccountDestinationId).IBAN,
                                                        SumToTransfer = x.SumToTransfer,
                                                        Date = x.Date,

                                                    });
                                                }
                                                else
                                                {
                                                    if (GetOwnerOfAccount(x.AccountDestinationId) == id && x.AccountSourceId!=0)
                                                    {
                                                        transfers.Add(new GetTransferDTO
                                                        {
                                                            SourceUserId = GetOwnerOfAccount(x.AccountSourceId),
                                                            DestinationUserId = id,
                                                            AccountSourceIBAN = this.acountService.GetAccountById(x.AccountDestinationId).IBAN,
                                                            AccountDestinationIBAN = this.acountService.GetAccountById(x.AccountSourceId).IBAN,
                                                            SumToTransfer = x.SumToTransfer,
                                                            Date = x.Date,

                                                        });
                                                    }
                                                }

                                            });
            return transfers;
        }

        public List<Bill> GetBillsOfUser(int id)
        {
            User u = this._userRepository.FindFullUser(id);
            if (u == null)
            {
                throw new APIException("user not found", StatusCodes.Status404NotFound);
            }
            u.Bills.Sort((x,y)=> { return y.Date.CompareTo(x.Date); });
            return u.Bills;
        }

        public List<GetDebtDTO> GetDebtsOfUser(int id)
        {
            User u = this._userRepository.FindFullUser(id);
            if (u == null)
            {
                throw new APIException("user not found", StatusCodes.Status404NotFound);
            }
            return u.Debts;
        }

        public List<GetDebtDTO> GetNotPayedDebtsOfUser(int id)
        {
            User user = this._userRepository.FindFullUser(id);
            List<GetDebtDTO> result = new List<GetDebtDTO>();
            if (user == null)
            {
                throw new APIException("user not found", StatusCodes.Status404NotFound);
            }
            foreach(GetDebtDTO debt in user.Debts)
            {
                if(debt.Payed==false)
                {
                    result.Add(debt);
                }
            }
            return result;
        }
        
        public List<FriendUserDTO> GetFriendsWhoDontParticipateOnBill(int userId,int billId)
        {
            Bill fullBill = this._billRepository.FindFull(billId);
            List<FriendUserDTO> friends = this.GetFriendsOfUser(userId);
            List<FriendUserDTO> friendsResult = this.GetFriendsOfUser(userId);

            if (fullBill == null)
            {
                throw new APIException("bill not found", StatusCodes.Status404NotFound);
            }

            foreach(FriendUserDTO friendUser in friends)
            {
                foreach(GetDebtorDTO debter in fullBill.Debitors)
                {
                    if(friendUser.UserId==debter.IdUser)
                    {
                        friendsResult.Remove(friendUser);
                    }
                }
            }
            return friendsResult;           
        }

        public double GetTotalBudgetOfUser(int id)
        {
            User u = this._userRepository.FindFullUser(id);
           
            if(u==null)
            {           
                 throw new APIException("user not found", StatusCodes.Status404NotFound);        
            }
            return u.Accounts.Sum(x => x.Budget);
            
        }

        public GetBudgetForStatistics GetTotalBudgetOfUserInDate(int id, DateTime date)
        {
            User u = this._userRepository.FindFullUser(id);
            double finalSum = 0;
            if (u == null)
            {
                throw new APIException("user not found", StatusCodes.Status404NotFound);
            }
            else
            {
                foreach (Account a in u.Accounts)
                {
                    Account fullAcc = this._accountRepository.FindFull(a.Id);
                    finalSum += fullAcc.Budget;
                    foreach (Operation op in fullAcc.Operations)
                    {
                        if (op.Date > date)
                        {
                            if (op.AccountSourceId == 0 || op.AccountDestinationId == fullAcc.Id)
                            {
                                finalSum -= op.SumToTransfer;
                            }
                            else
                            {
                                finalSum += op.SumToTransfer;
                            }
                        }
                    }
                }
            }
            foreach(Bill b in u.Bills)
            {
                if(b.IdCreator==u.Id && b.Date>date)
                {
                    finalSum += b.Price;
                }
            }
            u.Deposits.ForEach(x => { x.InitialSum += (int)(DateTime.Now - x.CreateDate).TotalDays; });
            foreach (Deposit d in u.Deposits)
            {
                if (d.CreateDate > date)
                {
                    finalSum += d.InitialSum;
                }
            }
            return new GetBudgetForStatistics
            {
                Date = date,
                TotalSum = finalSum,
            };
        }

        public List<GetBudgetForStatistics> LastWeekDayByDayTotalSum(int id)
        {
            List<GetBudgetForStatistics> result = new List<GetBudgetForStatistics>();

            DateTime date = DateTime.Now;
            DateTime daysAgo=new DateTime();

            for(int i = -6; i <= 0; ++i)
            {
                daysAgo = date.AddDays(i);
                var budget = GetTotalBudgetOfUserInDate(id, daysAgo);
                result.Add(budget);
            }
            return result;
        }

        public List<GetBudgetForStatistics> LastMonthDayByDayTotalSum(int id)
        {
            List<GetBudgetForStatistics> result = new List<GetBudgetForStatistics>();

            DateTime date = DateTime.Now;
            DateTime daysAgo = new DateTime();

            for (int i = -30; i <= 0; ++i)
            {
                daysAgo = date.AddDays(i);
                var budget = GetTotalBudgetOfUserInDate(id, daysAgo);
                result.Add(budget);
            }
            return result;
        }

        public List<GetDebtorOfPersonDTO> GetDebtorsOfUser(int id)
        {
            User user = this._userRepository.FindFullUser(id);
       
            if (user == null)
            {
                throw new APIException("user not found", StatusCodes.Status404NotFound);
            }

            return user.Debtors;
        }

        public List<Deposit> GetDepositsOfUser(int id)
        {
            User user = this._userRepository.FindFullUser(id);
            if (user == null)
            {
                throw new APIException("user not found", StatusCodes.Status404NotFound);
            }
            user.Deposits = user.Deposits.Where(x => x.Deleted == false).ToList();
            user.Deposits.ForEach(x => { x.InitialSum += (int)(DateTime.Now - x.CreateDate).TotalDays; });
            return user.Deposits;
        }

        



    }
}
