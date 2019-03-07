using AccesaBankAPI.Models;
using AccesaBankAPI.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.Common;
using System.Data.SqlClient;

namespace AccesaBankAPI.Repository
{
    public class MessageRepository : IMessageRepository
    {
        private string _connectionString;
        private DbConnection _dbConnection;

        public MessageRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:accesaBankDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public void Add(Message message)
        {
            var sql = "INSERT INTO Messages(IdSender,IdReceiver,Text,Date)" +
                "VALUES (@IdSender,@IdReceiver,@Text,@Date)";
            _dbConnection.Query(sql, new
            {
                IdSender=message.IdSender,
                IdReceiver=message.IdReceiver,
                Text=message.Text,
                Date=message.Date
            });
        }

        public IList<Message> GetMessages()
        {
            var sql = "SELECT * FROM Messages";
            return _dbConnection.Query<Message>(sql).ToList();
        }
    }
}
