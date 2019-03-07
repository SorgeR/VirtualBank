using AccesaBankAPI.ModelDTOs;
using AccesaBankAPI.ModelDTOs.AccountDTOS;
using AccesaBankAPI.ModelDTOs.FriendDTOS;
using AccesaBankAPI.Models;
using BankAPI.Models;
using BankAPI.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BankAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : Controller
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult CreateUser([FromBody] CreateUserDTO createUserDTO)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }

            try
            {
                GetUserDTO getUserDTO = _userService.CreateUser(createUserDTO);
                return Ok(getUserDTO);
            }
            catch (APIException ex)
            {
                ErrorMessage errorMessage = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, errorMessage.message);
            }

        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody]LoginUserDTO loginUserDTO)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }
            try
            {
                GetUserDTO getUserDTO = _userService.LoginUser(loginUserDTO);
                return Ok(getUserDTO);
            }
            catch(APIException ex)
            {
                ErrorMessage err=new ErrorMessage { message=ex.Message};
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("search")]
        public IActionResult GetUser([FromQuery]string phoneNumber,[FromQuery]int userId)
        {
            if (phoneNumber != null)
            {
                try
                {
                    GetUserDTO getUserDTO = _userService.GetUserDTOByPhoneNumber(phoneNumber);
                    return Ok(getUserDTO);
                }
                catch (APIException ex)
                {
                    ErrorMessage err = new ErrorMessage { message = ex.Message };
                    return StatusCode(ex.StatusCode, err);
                }
                
            }

            if(userId!=0)
            {
                try
                {
                    GetUserDTO getUserDTO = _userService.GetUserById(userId);
                    return Ok(getUserDTO);
                }
                catch (APIException ex)
                {
                    ErrorMessage err = new ErrorMessage { message = ex.Message };
                    return StatusCode(ex.StatusCode, err);
                }
            }

            return StatusCode(StatusCodes.Status400BadRequest);          
        }

        [HttpGet()]
        public IActionResult GetUsers()
        {
            var users = _userService.GetUsers();
            return Ok(users);
        }

        [HttpGet("full")]
        public IActionResult GetFullUsers(int userId)
        {
            var users = _userService.GetFullUser(userId);
            return Ok(users);
        }

        [HttpGet("friends/{userId}")]
        public IActionResult GetFriends(int userId)
        {
            var friends=_userService.GetFriendsOfUser(userId);
            return Ok(friends);
        }

        [HttpGet("nonfriends/{userId}")]
        public IActionResult GetNonFriends(int userId)
        {
            var nonFriends = _userService.GetUsersWhichAreNotFriendsOfUser(userId);
            return Ok(nonFriends);
        }

        [HttpGet("accounts/{userId}")]
        public IActionResult GetAccounts(int userId)
        {
            var accounts = _userService.GetAccountsOfUser(userId);
            return Ok(accounts);
        }

        [HttpGet("topup/{id}")]
        public IActionResult GetTopUps(int id)
        {
            try
            {
                var operations = this._userService.GetTopUpOperationsOfUser(id);
                return Ok(operations);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("transfer/{id}")]
        public IActionResult GetTransfers(int id)
        {
            try
            {
               var operations = this._userService.GetTransferOperationsOfUser(id);
                return Ok(operations);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("bills/{id}")]
        public IActionResult GetBills(int id)
        {
            return Ok(this._userService.GetBillsOfUser(id));
        }

        [HttpGet("nodebitorsfriends/{idUser}/{idBill}")]
        public IActionResult GetFriendsWhichAreNotDebitors(int idUser,int idBill)
        {
            try
            {
                return Ok(this._userService.GetFriendsWhoDontParticipateOnBill(idUser, idBill));
            }
            catch(APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("debtstopay/{id}")]
        public IActionResult GetDebtsUserShouldPay(int id)
        {
            try
            {
                var debts = this._userService.GetNotPayedDebtsOfUser(id);
                return Ok(debts);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }

        }

        [HttpGet("budget-statistics/{period}/{id}")]
        public IActionResult GetBudgetStatisticsHistory(int id,string period)
        {
            try
            {
                if (period == "week")
                {
                    var res = this._userService.LastWeekDayByDayTotalSum(id);
                    return Ok(res);
                }

                if (period == "month")
                {
                    var res = this._userService.LastMonthDayByDayTotalSum(id);
                    return Ok(res);
                }

                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }

        }

        [HttpGet("debtors/{id}")]
        public IActionResult GetDebtorsOfUser(int id)
        {
            try
            {
                var debtors = this._userService.GetDebtorsOfUser(id);
                return Ok(debtors);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("budget/{id}")]
        public IActionResult GetBudgetOfUser(int id)
        {
            try
            {
                var budget = this._userService.GetTotalBudgetOfUser(id);
                return Ok(new { budget = budget });
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }
     
        
        [HttpGet("deposits/{id}")]
        public IActionResult GetDepositsOfUser(int id)
        {
            try
            {
                var deposits = this._userService.GetDepositsOfUser(id);
                return Ok(deposits);
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }
    }
}