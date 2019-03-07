using BankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Repository.UserRepository
{
    public interface IUserRepository
    {

        User Add(User User);

        void Update(User User);

        void Delete(int UserId);

        User FindUser(int UserId);

        User FindFullUser(int UserId);

        List<User> GetUsers();

        

       

    }
}
