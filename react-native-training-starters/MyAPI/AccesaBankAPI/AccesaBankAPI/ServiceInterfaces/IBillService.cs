using AccesaBankAPI.ModelDTOs.BillDTOS;
using AccesaBankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ServiceInterfaces
{
    public interface IBillService
    {

        Bill CreateBill(Bill b);

        Bill FindBill(int id);

        Bill DeleteBill(int id);

        List<Bill> GetAllBills();

        Debt CreateDebt(Debt d);

        Debt UpdateDebt(Debt d);

        List<GetDebtorDTO> GetDebtorsOfBill(int id);

        Debt PayDebt(PayDebtDTO payDebt);

        double GetAmountToBeShared(int idBill);


    }
}
