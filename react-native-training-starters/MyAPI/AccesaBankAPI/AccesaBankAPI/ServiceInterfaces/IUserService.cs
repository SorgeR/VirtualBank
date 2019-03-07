using AccesaBankAPI.ModelDTOs;
using AccesaBankAPI.ModelDTOs.AccountDTOS;
using AccesaBankAPI.ModelDTOs.BillDTOS;
using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using AccesaBankAPI.ModelDTOs.OperationDTOS;
using AccesaBankAPI.Models;
using BankAPI.Models;
using System;
using System.Collections.Generic;

namespace BankAPI.Services.UserService
{
    public interface IUserService
    {
        List<GetUserDTO> GetUsers();

        GetUserDTO CreateUser(CreateUserDTO createUserDTO);

        GetUserDTO GetUserById(int id);

        GetUserDTO LoginUser(LoginUserDTO loginUserDTO);

        GetUserDTO GetUserDTOByPhoneNumber(string phoneNumber);

        User GetFullUser(int userId);

        List<FriendUserDTO> GetFriendsOfUser(int id);

        List<GetAccountDTO> GetAccountsOfUser(int id);

        List<FriendGroupDTO> GetFriendGroupOfUser(int id);

        List<GetUserDTO> GetUsersWhichAreNotFriendsOfUser(int id);

        List<Operation> GetOperationsForAllAccountsOfUser(int id);

        List<GetTopUpDTO> GetTopUpOperationsOfUser(int id);

        List<GetTransferDTO> GetTransferOperationsOfUser(int id);

        List<Bill> GetBillsOfUser(int id);

        List<GetDebtDTO> GetDebtsOfUser(int id);

        List<FriendUserDTO> GetFriendsWhoDontParticipateOnBill(int userId, int billId);

        List<GetDebtDTO> GetNotPayedDebtsOfUser(int id);

        double GetTotalBudgetOfUser(int id);

        GetBudgetForStatistics GetTotalBudgetOfUserInDate(int id, DateTime date);

        List<GetBudgetForStatistics> LastWeekDayByDayTotalSum(int id);

        List<GetBudgetForStatistics> LastMonthDayByDayTotalSum(int id);

        List<GetDebtorOfPersonDTO> GetDebtorsOfUser(int id);

        List<Deposit> GetDepositsOfUser(int id);


    }
}
