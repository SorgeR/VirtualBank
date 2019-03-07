using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccesaBankAPI.ModelDTOs.BillDTOS;
using AccesaBankAPI.Models;
using AccesaBankAPI.ServiceInterfaces;
using BankAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccesaBankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private IBillService _billService;

        public BillsController(IBillService billService)
        {
            _billService = billService;
        }

        [HttpPost()]
        public IActionResult CreateBill([FromBody]Bill bill)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }
            try
            {
                var newBill=this._billService.CreateBill(bill);
                return Ok(newBill);
                
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpPost("debt")]
        public IActionResult CreateDebt([FromBody]Debt debt)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }
            try
            {
                var newDebt = this._billService.CreateDebt(debt);
                return Ok(newDebt);

            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("restAmount/{id}")]
        public IActionResult RestOfAmountForBill(int id)
        {
            try
            {
                var amount = this._billService.GetAmountToBeShared(id);
                return Ok(new { restAmount = amount});

            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("debtors/{id}")]
        public IActionResult GetDebtorsOfBill(int id)
        {
            try
            {
                var debtors = this._billService.GetDebtorsOfBill(id);
                return Ok(debtors);

            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpPost("paydebt")]
        public IActionResult PayDebt([FromBody]PayDebtDTO payDebt)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }
            try
            {
                var debt = this._billService.PayDebt(payDebt);
                return Ok(debt);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }

        }
    }
}
