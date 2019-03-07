using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using AccesaBankAPI.ModelDTOs.BillDTOS;
using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.Models;
using BankAPI.Models;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace AccesaBankAPI.Repository.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:accesaBankDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }


        public User Add(User User)
        {
            var sql = "INSERT INTO Users(PhoneNumber,FirstName,LastName,Password) " +
                 "VALUES(@PhoneNumber,@FirstName,@LastName,@Password)";
            _dbConnection.Query(sql, User);

            return User;
        }

        public void Delete(int UserId)
        {
            var sql = "DELETE FROM Users WHERE Id=@UserId";
            _dbConnection.Query(sql, new { UserId=UserId });
        }

        public User FindFullUser(int UserId)
        {
            var sql = "SELECT * FROM Users WHERE id=@UserId " +
                "SELECT * FROM Accounts WHERE UserId=@UserId " +
                "SELECT f.Id as FriendshipId, u.Id as UserId,u.FirstName,u.LastName,u.Password,u.PhoneNumber FROM Friends f,Users u WHERE UserRequesterId = @UserId and u.Id = f.UserAccepterId " +
                "SELECT fg.Id,fg.AdminId,fg.CreateDate,fg.Name FROM FriendsGroups fg, FriendsGroupsMembers fgm, Users u WHERE  fgm.MemberId=u.Id and u.Id=@UserId and fg.Id = fgm.GroupId " +
                "SELECT b.Id,b.IdCreator,b.Name,b.Description,b.Date,b.Price,b.PayedFromAccountId  FROM Bills b WHERE (@UserId = b.IdCreator) "+
                "SELECT b.Id,b.IdCreator,b.Name,b.Description,b.Date,b.Price,b.PayedFromAccountId FROM Bills b,Debts d WHERE (b.Id = d.IdBill and @UserId = d.IdDebtor)" +
                "SELECT d.Id as IdDebt,d.IdCreator,b.Name as BillName,d.SumToPay as SumToPay,d.Payed,(SELECT u.FirstName FROM Users u WHERE d.IdCreator=u.Id) as CreatorFirstName,(SELECT u.LastName FROM Users u WHERE d.IdCreator=u.Id) as CreatorLastName,(SELECT a.IBAN FROM Accounts a, Bills bi WHERE bi.Id=b.Id and bi.PayedFromAccountId=a.Id) as CreatorIBAN,b.PayedFromAccountId as CreatorAccountId FROM Debts d,Bills b, Users u WHERE d.IdBill = b.Id and d.IdDebtor =@UserId and u.Id = @UserId "+
                "SELECT u.id AS UserId,b.Name AS BillName,d.SumToPay AS SumToGet,d.IdDebtor AS DebtorId,(SELECT FirstName FROM Users WHERE id=d.IdDebtor) AS DebtorFirstName, (SELECT LastName FROM Users WHERE id=d.IdDebtor) AS DebtorLastName FROM Bills b,Users u,Debts d WHERE @UserId=b.idCreator and @UserId=d.IdCreator and d.idBill=b.id and u.id=@UserId and d.Payed=0 " +
                "SELECT * FROM Deposits WHERE IdUser=@UserId";


            using (var multipleResults = _dbConnection.QueryMultiple(sql, new { UserId=UserId}))
            {
                User user = multipleResults.Read<User>().FirstOrDefault();
                var accounts = multipleResults.Read<Account>().ToList();
                var friends = multipleResults.Read<FriendUserDTO>().ToList();
                var groups = multipleResults.Read<FriendGroup>().ToList();
                var billsCreated = multipleResults.Read<Bill>().ToList();
                var billsTakingPart = multipleResults.Read<Bill>().ToList();
                var bills = new List<Bill>();
                var debts = multipleResults.Read<GetDebtDTO>().ToList();   
                foreach (Bill b in billsCreated)
                {
                    bills.Add(b);
                }
                foreach (Bill b in billsTakingPart)
                {
                    bills.Add(b);
                }
                var debtors = multipleResults.Read<GetDebtorOfPersonDTO>().ToList();
                var deposits = multipleResults.Read<Deposit>().ToList();
                if (user != null)
                {
                    user.Accounts = accounts;
                    user.Friends = friends;
                    user.FriendGroups = groups;
                    user.Bills = bills;
                    user.Debts = debts;
                    user.Debtors = debtors;
                    user.Deposits = deposits;
                    return user;
                }
                return null;
                
            }
            
        }

        public User FindUser(int UserId)
        {
            var sql = "SELECT * FROM Users WHERE Id=@UserId";
            var user=_dbConnection.Query<User>(sql, new { UserId = UserId }).FirstOrDefault();
            return user;
        }

        public List<User> GetUsers()
        {
            var sql = "SELECT * FROM Users";
            var users=_dbConnection.Query<User>(sql).ToList();
            return users;
            
        }

        public void Update(User User)
        {
            var sql = "UPDATE Users SET " +
                "Id=@Id" +
                "PhoneNumber=@PhoneNumber" +
                "FirstName=@FirstName" +
                "LastName=@LastName" +
                "Password=@Password";
            _dbConnection.Query(sql, User);
        }

       

    }
}
