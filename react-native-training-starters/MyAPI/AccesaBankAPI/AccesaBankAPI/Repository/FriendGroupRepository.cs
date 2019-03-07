using AccesaBankAPI.ModelDTOs.FriendGroupDTOS;
using AccesaBankAPI.RepositoryInterfaces;
using BankAPI.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace AccesaBankAPI.Repository
{
    public class FriendGroupRepository : IFriendGroupRepository
    {

        private string _connectionString;
        private DbConnection _dbConnection;

        public FriendGroupRepository(IConfiguration configuration)
        {
            _connectionString = configuration["connectionStrings:accesaBankDB"];
            _dbConnection = new SqlConnection(_connectionString);
        }

        public FriendGroup Add(FriendGroup friendGroup)
        {
            var sql = "INSERT INTO FriendsGroups(Name, AdminId, CreateDate)" +
                    "OUTPUT Inserted.[Id], Inserted.[Name],Inserted.[AdminId],Inserted.[CreateDate]" +
                     "VALUES(@Name,@AdminId,@CreateDate)";
            FriendGroup fg=_dbConnection.Query<FriendGroup>(sql, friendGroup).FirstOrDefault();
            return fg;
        }

        public void Delete(int id)
        {
            var sql = "DELETE FROM FriendsGroups WHERE Id=@Id";
            _dbConnection.Query(sql, new { Id = id });
        }

        public FriendGroup Find(int id)
        {
            var sql = "SELECT * FROM FriendsGroups WHERE Id=@Id";
            FriendGroup friendGroup = _dbConnection.Query<FriendGroup>(sql, new { Id = id }).FirstOrDefault();
            return friendGroup;
        }

        public FriendGroup FindFullGroup(int id)
        {
            var sql = "SELECT * FROM FriendsGroups WHERE Id=@Id " +
                "SELECT f.Id as GroupId,fgm.Id as MembershipId,u.Id as UserId,u.FirstName,u.LastName,u.PhoneNumber " +
                    "FROM FriendsGroups f,Users u, FriendsGroupsMembers fgm " +
                    "WHERE fgm.MemberId = u.Id and @Id = fgm.GroupId and f.Id=@Id";

            using (var multipleResults = _dbConnection.QueryMultiple(sql, new { @Id = id }))
            {
                FriendGroup friendGroup = multipleResults.Read<FriendGroup>().FirstOrDefault();
                var members = multipleResults.Read<GroupMemberDTO>().ToList();

                if (friendGroup != null)
                {
                    friendGroup.members = members;
                    return friendGroup;
                }
                return null;

            }

        }

        public List<FriendGroup> GetAll()
        {
            var sql = "SELECT * FROM FriendsGroups";
            List<FriendGroup> friendGroups = _dbConnection.Query<FriendGroup>(sql).ToList();
            return friendGroups;
        }

        public void Update(FriendGroup friendGroup)
        {
            var sql = "UPDATE FriendsGroups SET " +
                "Name=@Name " +
                "WHERE Id=@Id";
            _dbConnection.Query(sql, friendGroup);
        }

        public void AddMember(int friendGroupId, int userId, DateTime date)
        {
            var sql = "INSERT INTO FriendsGroupsMembers(GroupId,MemberId,EntryDate)" +
                "VALUES(@GroupId,@MemberId,@EntryDate)";
            _dbConnection.Query(sql, new { GroupId = friendGroupId, MemberId = userId, EntryDate = date });
        }

        public void DeleteMember(int id)
        {
            var sql = "DELETE FROM FriendsGroupsMembers WHERE Id=@Id";
            _dbConnection.Query(sql, new { Id = id });
        }
        


        public GroupMemberDTO FindMember(int id)
        {
             var sql = "SELECT * FROM FriendsGroupsMembers WHERE Id=@Id";
            GroupMemberDTO groupMember = _dbConnection.Query<GroupMemberDTO>(sql,new { Id = id }).FirstOrDefault();
            return groupMember;
        }
    

        }
   }
    

