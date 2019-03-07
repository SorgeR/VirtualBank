using System.Data.Common;
using System.Data.SqlClient;
using AccesaBankAPI.Models;
using AccesaBankAPI.RepositoryInterfaces;
using Microsoft.Extensions.Configuration;
using Dapper;
namespace AccesaBankAPI.Repository
{
    public class OperationRepository:IOperationRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;

        public OperationRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:accesaBankDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public void Add(Operation Operation)
        {
            string sql="";
            if (Operation.AccountSourceId != 0)
            {
                sql = "INSERT INTO Operations(AccountSourceId,AccountDestinationId,SumToTransfer,Date)" +
                 "VALUES(@AccountSourceId,@AccountDestinationId,@SumToTransfer,@Date)";
            }
            else
            {
                 sql = "INSERT INTO Operations(AccountDestinationId,SumToTransfer,Date)" +
                 "VALUES(@AccountDestinationId,@SumToTransfer,@Date)";
            }
            _dbConnection.Query(sql, Operation);
        }

        public void Delete(int id)
        {
            var sql = "DELETE FROM Operations WHERE Id=@Id";
            _dbConnection.Query(sql, new { Id = id });

        }
    }
}
