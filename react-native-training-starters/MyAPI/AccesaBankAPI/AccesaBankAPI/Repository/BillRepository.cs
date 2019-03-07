using AccesaBankAPI.Models;
using AccesaBankAPI.RepositoryInterfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using AccesaBankAPI.ModelDTOs.BillDTOS;

namespace AccesaBankAPI.Repository
{
    public class BillRepository : IBillRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;

        public BillRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:accesaBankDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public void Add(Bill bill)
        {
            var sql = "INSERT INTO Bills(IdCreator,Name,Description,Date,Price,PayedFromAccountId)" +
                "VALUES(@IdCreator,@Name,@Description,@Date,@Price,@PayedFromAccountId)";
            _dbConnection.Query(sql, new
            {
                    IdCreator=bill.IdCreator,
                    Name=bill.Name,
                    Description=bill.Description,
                    Date=bill.Date,
                    Price=bill.Price,
                    PayedFromAccountId=bill.PayedFromAccountId,
            });
        }


        public void Delete(int id)
        {
            var sql = "DELETE FROM Bills WHERE id=@id";
            _dbConnection.Query(sql, new { id = id });
        }

        public Bill Find(int id)
        {
            var sql = "SELECT * FROM Bills WHERE id=@id";
            return _dbConnection.Query<Bill>(sql, new { id = id }).FirstOrDefault();
        }

        public List<Bill> FindAll()
        {
            var sql = "SELECT * FROM Bills";
            return _dbConnection.Query<Bill>(sql).ToList();
              
        }

        public Bill FindFull(int id)
        {
            var sql = "SELECT * FROM Bills WHERE id=@id " +
                "SELECT u.id AS IdUser, u.FirstName AS UFirstName, u.LastName AS ULastName,d.SumToPay,d.Payed " +
                "FROM Bills b, Debts d, Users u " +
                "WHERE @id = d.IdBill AND u.Id = d.IdDebtor AND b.id=d.idBill";
       
            using (var multipleResults = _dbConnection.QueryMultiple(sql, new { id=id}))
            {
                Bill bill = multipleResults.Read<Bill>().FirstOrDefault();
                var debts = multipleResults.Read<GetDebtorDTO>().ToList();
         
                if (bill != null)
                {
                    bill.Debitors = debts;
                    return bill;
                }
                return null;

            }
        }

        public void AddDebt(Debt debt)
        {
            var sql = "INSERT INTO Debts(IdDebtor,IdCreator,IdBill,SumToPay,Payed)" +
                "VALUES(@IdDebtor,@IdCreator,@IdBill,@SumToPay,0)";
            _dbConnection.Query(sql, new
            {
                IdDebtor=debt.IdDebtor,
                IdCreator=debt.IdCreator,
                IdBill=debt.IdBill,
                SumToPay=debt.SumToPay,

            });
        }

        public void UpdateDebt(Debt debt)
        {
            var sql = "UPDATE Debts SET " +
                 "IdDebtor=@IdDebtor," +
                 "IdCreator=@IdCreator," +
                 "IdBill=@IdBill," +
                 "SumToPay=@SumToPay," +
                 "Payed=@Payed " +
                 "WHERE id=@Id";
            _dbConnection.Query(sql, new
            {
                IdDebtor=debt.IdDebtor,
                IdCreator=debt.IdCreator,
                IdBill=debt.IdBill,
                SumToPay=debt.SumToPay,
                Payed=debt.Payed,
                Id=debt.Id,
            });
        }

        public Debt FindDebt(int id)
        {
            var sql = "SELECT * FROM Debts WHERE Id=@Id";
            return this._dbConnection.Query<Debt>(sql, new { Id = id }).FirstOrDefault();
        }
    }
}
