using System;
using AccesaBankAPI.ModelDTOs.AccountDTOS;
using AccesaBankAPI.ModelDTOs.Deposit;
using AccesaBankAPI.Models;
using AccesaBankAPI.ServiceInterfaces;
using BankAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private IAccountService _accountService;

        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost()]
        public IActionResult AddAccount([FromBody] AccountDTO createAccountDTO)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }

            Account getAccountDTO = _accountService.CreateAccount(createAccountDTO);
            return Ok(getAccountDTO);
        }

        [HttpDelete("{accountId}")]
        public IActionResult DeleteAccount(int accountId)
        {
            try
            {
                GetAccountDTO account = _accountService.DeleteAccount(accountId);
                return Ok(account);
            }
            catch (APIException ex)
            {
                ErrorMessage errorMessage = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, errorMessage);
            }
        }

        [HttpPost("topup/{destinationId}/{sumToTransfer}")]
        public IActionResult TopUpAccount(int destinationId,
                                          Double sumToTransfer)
        {
            try
            {
                GetAccountDTO account = _accountService.TopUpAccount(destinationId, sumToTransfer);
                return Ok(account);
            }
            catch(APIException ex)
            {
                ErrorMessage errorMessage = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, errorMessage);
            }
        }

        [HttpPost("transfer")]
        public IActionResult TransferAccounts([FromQuery]int sourceId,
                                              [FromQuery]int destinationId,
                                              [FromQuery]Double sumToTransfer)
        {
            if(sourceId==0 || destinationId==0 || sumToTransfer == 0)
            {
             
                    return StatusCode(400, "bad data!");
                
            }
            try
            {
                Operation operation = _accountService.TransferAccounts(sourceId, destinationId, sumToTransfer);
                return Ok(operation);
            }
            catch (APIException ex)
            {
                ErrorMessage errorMessage = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, errorMessage);
            }
        }

        
        [HttpGet("search")]
        public IActionResult GetAccount([FromQuery]int accountId)
        {
           
            try
            {
                GetAccountDTO account = _accountService.GetAccountById(accountId);
                return Ok(account);
            }
            catch(APIException ex)
            {
                ErrorMessage errorMessage = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, errorMessage);
            }
            
        }

        [HttpPost("deposit")]
        public IActionResult CreateDeposit([FromBody]CreateDepositDTO createDeposit)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }

            try
            {
                var deposit=this._accountService.AddDeposit(createDeposit);
                return Ok(deposit);
            }
            catch (APIException ex)
            {
                ErrorMessage errorMessage = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, errorMessage);
            }
        }

        [HttpDelete("deposit/{idDeposit}/{idAccount}")]
        public IActionResult DeleteDeposit(int idDeposit,int idAccount)
        {
            try
            {
                var deposit = this._accountService.DeleteDeposit(idDeposit, idAccount);
                return Ok(deposit);
            }
            catch (APIException ex)
            {
                ErrorMessage errorMessage = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, errorMessage);
            }
        }
    }
}