using AccesaBankAPI.ModelDTOs.AccountDTOS;
using AccesaBankAPI.ModelDTOs.Deposit;
using AccesaBankAPI.Models;
using AccesaBankAPI.Repository.UserRepository;
using AccesaBankAPI.RepositoryInterfaces;
using AccesaBankAPI.ServiceInterfaces;
using AutoMapper;
using BankAPI.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AccesaBankAPI.Services
{
    public class AccountsService:IAccountService
    {
        private IAccountRepository _accountRepository;
        private IOperationRepository _operationRepository;
        private IMapper _mapper;
        private IUserRepository _userRepository;
  
        public AccountsService(IAccountRepository accountRepository, IOperationRepository operationRepository, IMapper mapper, IUserRepository userRepository)
        {
            _accountRepository = accountRepository;
            _operationRepository = operationRepository;
            _mapper = mapper;
            _userRepository = userRepository;
          
        }

        private String GenerateIBAN()
        {
            Random rnd = new Random();
            String IBAN = "RO";
            for(int i = 0; i < 22; ++i)
            {
                IBAN += rnd.Next(0,9).ToString();
            }
            return IBAN;
        }

        public Account CreateAccount(AccountDTO account)
        {

            Account foundAccount = this._accountRepository.GetAll().Where(a=>a.Id==account.Id ).FirstOrDefault();
            Account accountToAdd = _mapper.Map<Account>(account);
            while (true)
            {
                accountToAdd.IBAN = GenerateIBAN();
                Account foundByIBAN = this._accountRepository.GetAll().Where(a=>a.IBAN == account.IBAN).FirstOrDefault();
                if (foundByIBAN == null)
                {
                    break;
                }

            }
            if (foundAccount != null)
            {
                throw new APIException("The account already exists!", StatusCodes.Status409Conflict);
            }
            else
            {
                _accountRepository.Add(accountToAdd);
                return _mapper.Map<Account>(account);
            }
        }

        public GetAccountDTO DeleteAccount(int id)
        {
            Account foundAccount = _accountRepository.FindFull(id);
      
            if (foundAccount == null)
            {
                throw new APIException("The account does not exist!", StatusCodes.Status404NotFound);
            }
            foundAccount.Operations.ForEach(x => _operationRepository.Delete(x.Id));
            
            _accountRepository.Delete(id);
            return _mapper.Map<GetAccountDTO>(foundAccount);
        }

        public GetAccountDTO GetAccountById(int id)
        {
            Account foundAccount = _accountRepository.Find(id);
            return _mapper.Map<GetAccountDTO>(foundAccount);
        }

        public GetAccountDTO TopUpAccount(int destinationId,Double SumToTransfer)
        {
            Account account = _accountRepository.Find(destinationId);
            if (account == null)
            {
                throw new APIException("The account does not exist!", StatusCodes.Status404NotFound);
            }
            else
            {
                account.Budget += SumToTransfer;
                _accountRepository.Update(account);
                Operation operation = new Operation { AccountDestinationId = destinationId, SumToTransfer = SumToTransfer, Date = DateTime.Now };
                _operationRepository.Add(operation);
                return _mapper.Map<GetAccountDTO>(account);
            }
        }

        public Operation TransferAccounts(int sourceId,int destinationId,Double SumToTransfer)
        {
            Account accountDestination = _accountRepository.Find(destinationId);
            Account accountSource = _accountRepository.Find(sourceId);

            if (accountDestination == null || accountSource==null)
            {
                throw new APIException("The account does not exist!", StatusCodes.Status404NotFound);
            }
            if (accountSource.Budget < SumToTransfer)
            {
                throw new APIException("The source accounts does not have enough money!", StatusCodes.Status401Unauthorized);
            }
            else
            {
                accountSource.Budget -= SumToTransfer;
                accountDestination.Budget += SumToTransfer;
                _accountRepository.Update(accountSource);
                _accountRepository.Update(accountDestination);
                Operation operation = new Operation { AccountSourceId=sourceId,
                                                      AccountDestinationId = destinationId,
                                                      SumToTransfer = SumToTransfer,
                                                      Date = DateTime.Now
                                                    };
                _operationRepository.Add(operation);
                return operation;
            }
        }

        public void TakeMoneyFromAccount(int id, double sum)
        {
            Account account = this._accountRepository.Find(id);
            if (account == null)
            {
                throw new APIException("the account does not exist!", StatusCodes.Status404NotFound);
            }
            if (account.Budget < sum)
            {
                throw new APIException("not enough money in the account!", StatusCodes.Status400BadRequest);
            }
            account.Budget -= sum;
            this._accountRepository.Update(account);
            
        }

        public Deposit AddDeposit(CreateDepositDTO createDeposit)
        {
            if (this._userRepository.FindUser(createDeposit.IdUser) == null)
            {
                throw new APIException("the user does not exist!", StatusCodes.Status404NotFound);
            }

            if (this._accountRepository.Find(createDeposit.IdAccount) == null)
            {
                throw new APIException("the account does not exist!", StatusCodes.Status404NotFound);
            }
            this.TakeMoneyFromAccount(createDeposit.IdAccount,createDeposit.InitialSum);
            Deposit deposit = new Deposit
            {
                IdUser = createDeposit.IdUser,
                InitialSum = createDeposit.InitialSum,
                Title=createDeposit.Title,
            };
            deposit.CreateDate = DateTime.Now;
            this._accountRepository.AddDeposit(deposit);
            
            
            return deposit;
        }

        public double GetTotalSumOfDepositNow(int idDeposit)
        {
            Deposit deposit = this._accountRepository.FindDeposit(idDeposit);
            return (int)(DateTime.Now - deposit.CreateDate).TotalDays+deposit.InitialSum;
        }

        public Deposit DeleteDeposit(int idDeposit,int idAccount)
        {
            Deposit deposit = this._accountRepository.FindDeposit(idDeposit);
            double sumToTopUp = this.GetTotalSumOfDepositNow(idDeposit);
            this.TopUpAccount(idAccount, sumToTopUp);
            this._accountRepository.DeleteDeposit(idDeposit);
            return deposit;
        }
    }
}
