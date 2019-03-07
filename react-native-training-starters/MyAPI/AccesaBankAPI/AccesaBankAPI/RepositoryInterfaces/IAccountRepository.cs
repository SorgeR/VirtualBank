using AccesaBankAPI.Models;
using BankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.RepositoryInterfaces
{
    public interface IAccountRepository
    {
        void Add(Account Account);

        void Delete(int AccountId);

        void Update(Account Account);

        Account Find(int AccountId);

        List<Account> GetAll();

        Account FindFull(int AccountId);

        void AddDeposit(Deposit d);

        void DeleteDeposit(int DepositId);

        Deposit FindDeposit(int IdDeposit);

    }
}
