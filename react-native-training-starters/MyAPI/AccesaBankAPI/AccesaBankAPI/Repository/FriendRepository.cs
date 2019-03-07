using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BankAPI.Models;
using Microsoft.Extensions.Configuration;
using Dapper;

namespace AccesaBankAPI.Repository.FriendRepository
{
    public class FriendRepository : IFriendRepository
    {

        private string _connectionString;
        private DbConnection _dbConnection;

        public FriendRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:accesaBankDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public void Add(Friend Friend)
        {
            var sql = "INSERT INTO Friends(UserRequesterId,UserAccepterId,SinceDate)" +
                "VALUES(@UserRequesterId,@UserAccepterId,@SinceDate)";
            _dbConnection.Query(sql, Friend);
        }

        public void Delete(int FriendId)
        {
            var sql = "DELETE FROM Friends WHERE Id=@FriendId";
            _dbConnection.Query(sql, new { FriendId = FriendId });
        }

        public Friend FindFriend(int FriendId)
        {
            var sql = "SELECT * FROM Friends WHERE Id=@FriendId";
            var friend = _dbConnection.Query<Friend>(sql, new { FriendId = FriendId }).FirstOrDefault();
            return friend;
        }

        public List<Friend> GetFriends()
        {
            var sql = "SELECT * FROM Friends";
            var friends = _dbConnection.Query<Friend>(sql).ToList();
            return friends;
        }

     
    }
}
