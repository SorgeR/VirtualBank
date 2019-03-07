using AccesaBankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.RepositoryInterfaces
{
    public interface IBillRepository
    {
        void Add(Bill bill);

        void Delete(int id);

        Bill Find(int id);

        Bill FindFull(int id);

        List<Bill> FindAll();

        void AddDebt(Debt debt);

        void UpdateDebt(Debt debt);

        Debt FindDebt(int id);


    }
}
