using AccesaBankAPI.RepositoryInterfaces;

using BankAPI.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using Dapper;
using System.Linq;
using AccesaBankAPI.Models;

namespace AccesaBankAPI.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;

        public AccountRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:accesaBankDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public void Add(Account Account)
        {
            var sql = "INSERT INTO Accounts(IBAN,userid,budget,currency,alias)" +
                "VALUES(@IBAN,@userId,@budget,@currency,@alias)";
            _dbConnection.Query(sql, Account);
                
        }

        

        public void Delete(int AccountId)
        {
            var sql = "DELETE FROM Accounts " +
                "WHERE Id=@AccountId";
            _dbConnection.Query(sql, new { AccountId = AccountId });
        }


        public Account Find(int AccountId)
        {
            var sql = "SELECT * FROM Accounts  WHERE Id=@AccountId";
            Account account = _dbConnection.Query<Account>(sql, new { AccountId = AccountId }).FirstOrDefault();
            return account;
        }

        public Account FindFull(int AccountId)
        {
            var sql = "SELECT * FROM Accounts WHERE Id=@AccountId " +
                "SELECT * FROM Operations WHERE AccountSourceId=@AccountId or AccountDestinationId=@AccountId";

            using (var multipleResults = _dbConnection.QueryMultiple(sql, new { AccountId = AccountId }))
            {
                Account account = multipleResults.Read<Account>().FirstOrDefault();
                var operations = multipleResults.Read<Operation>().ToList();
                if (account != null)
                {
                    account.Operations = operations;
                    return account;
                }
                return null;

            }
        }

        public List<Account> GetAll()
        {
            var sql = "SELECT * FROM Accounts";
            List<Account> accounts = _dbConnection.Query<Account>(sql).ToList();
            return accounts;
        }

        public void Update(Account Account)
        {
            var sql= "UPDATE Accounts SET " +
                 "IBAN=@IBAN," +
                 "userId=@userId," +
                 "budget=@budget," +
                 "currency=@currency,"+
                 "alias=@alias WHERE Id=@Id";
            _dbConnection.Query(sql, Account);
        }

        public void AddDeposit(Deposit d)
        {
            var sql= "INSERT INTO Deposits(IdUser,Title,InitialSum,CreateDate,Deleted)"+
                   "VALUES(@IdUser, @Title, @InitialSum, @CreateDate,0)";

            _dbConnection.Query(sql,d);
            
        }

        public void DeleteDeposit(int IdDeposit)
        {
            var sql = "UPDATE Deposits SET Deleted=1 WHERE Id=@IdDeposit";
            _dbConnection.Query(sql, new { IdDeposit = IdDeposit });
        }

        public Deposit FindDeposit(int IdDeposit)
        {
            var sql = "SELECT * FROM Deposits  WHERE Id=@IdDeposit and Deleted=0";
            Deposit deposit = _dbConnection.Query<Deposit>(sql, new { IdDeposit = IdDeposit }).FirstOrDefault();
            return deposit;
        }


    }
}
