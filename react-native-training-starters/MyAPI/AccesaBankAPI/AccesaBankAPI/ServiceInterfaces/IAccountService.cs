using AccesaBankAPI.ModelDTOs.AccountDTOS;
using AccesaBankAPI.ModelDTOs.Deposit;
using AccesaBankAPI.Models;
using BankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ServiceInterfaces
{
    public interface IAccountService
    {

        Account CreateAccount(AccountDTO account);

        GetAccountDTO DeleteAccount(int id);

        GetAccountDTO TopUpAccount(int destinationId, Double SumToTransfer);

        Operation TransferAccounts(int sourceId, int destinationId, Double SumToTransfer);

        GetAccountDTO GetAccountById(int id);

        void TakeMoneyFromAccount(int id,double sum);

        Deposit AddDeposit(CreateDepositDTO deposit);

        Deposit DeleteDeposit(int idDeposit, int idAccount);
    }
}
