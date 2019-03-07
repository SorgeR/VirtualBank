using AccesaBankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.RepositoryInterfaces
{
    public interface IOperationRepository
    {
        void Add(Operation Operation);

        void Delete(int id);
    }
}
