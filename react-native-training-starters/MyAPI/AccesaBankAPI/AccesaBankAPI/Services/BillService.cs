using AccesaBankAPI.ModelDTOs.AccountDTOS;
using AccesaBankAPI.ModelDTOs.BillDTOS;
using AccesaBankAPI.Models;
using AccesaBankAPI.RepositoryInterfaces;
using AccesaBankAPI.ServiceInterfaces;
using AutoMapper;
using BankAPI.Models;
using BankAPI.Services.UserService;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Services
{
    public class BillService:IBillService
    {

        private IBillRepository _billRepository;
        private IUserService _userService;
        private IAccountService _accountService;
        private IMapper _mapper;

        public BillService(IBillRepository billRepository, IUserService userService, IAccountService accountService, IMapper mapper)
        {
            _billRepository = billRepository;
            _userService = userService;
            _accountService = accountService;
            _mapper = mapper;
        }

        public Bill CreateBill(Bill b)
        {
            this._billRepository.Add(b);
            this._accountService.TakeMoneyFromAccount(b.PayedFromAccountId, b.Price);

            return b;
        }

        public Debt CreateDebt(Debt d)
        {

            this._billRepository.AddDebt(d);
            return d;
        }

        public Bill DeleteBill(int id)
        {
            Bill b = this._billRepository.Find(id);
            if (b == null)
            {
                throw new APIException("the bills could not be found", StatusCodes.Status404NotFound);
            }
            this._billRepository.Delete(id);
            return b;
        }

        public Bill FindBill(int id)
        {
            Bill b = this._billRepository.Find(id);
            if (b == null)
            {
                throw new APIException("the bills could not be found", StatusCodes.Status404NotFound);
            }
            return b;
        }

        public List<Bill> GetAllBills()
        {
            return this._billRepository.FindAll();
        }

        public Debt PayDebt(PayDebtDTO payDebt)
        {
            Debt debt = this._billRepository.FindDebt(payDebt.idDebt);
            if (debt == null)
            {
                throw new APIException("the debt could not be found", StatusCodes.Status404NotFound);
            }
            this._accountService.TransferAccounts(payDebt.idAccountSource,payDebt.idAccountDestination, payDebt.sumToPay);
            debt.Payed = true;
            this.UpdateDebt(debt);
            return debt;
        }

        public Debt UpdateDebt(Debt debt)
        {
            Debt d = this._billRepository.FindDebt(debt.Id);
            if (d == null)
            {
                throw new APIException("the debt could not be found", StatusCodes.Status404NotFound);
            }
            this._billRepository.UpdateDebt(debt);
            return debt;
        }

        public double GetAmountToBeShared(int idBill)
        {
            Bill b = this._billRepository.FindFull(idBill);
            if (b == null)
            {
                throw new APIException("the bill could not be found", StatusCodes.Status404NotFound);
            }
            b.Debitors.ForEach(x =>
            {
                b.Price -= x.SumToPay;
            });
            return b.Price;
        }

        public List<GetDebtorDTO> GetDebtorsOfBill(int id)
        {
            Bill b = this._billRepository.FindFull(id);
            if (b == null)
            {
                throw new APIException("the bill could not be found", StatusCodes.Status404NotFound);
            }

            return b.Debitors;
        }

      
    }
}
