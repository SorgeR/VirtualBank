using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccesaBankAPI.Models;
using AccesaBankAPI.ServiceInterfaces;
using AccesaBankAPI.Services;
using BankAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccesaBankAPI.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private IMessagesService serviceMessages;

        public MessagesController(IMessagesService serviceMessages)
        {
            this.serviceMessages = serviceMessages;
        }

        [HttpPost()]
        public IActionResult AddMessage([FromBody] Message message)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, "bad data!");
            }

            try
            {
                var newValue = this.serviceMessages.CreateMessage(message);
                return (Ok(newValue));
            }
            catch (APIException ex)
            {
                ErrorMessage err = new ErrorMessage { message = ex.Message };
                return StatusCode(ex.StatusCode, err);
            }
        }

        [HttpGet("{idSender}/{idReceiver}")]
        public IActionResult GetMessagesForUsers(int idSender,int idReceiver)
        {
            var messages = serviceMessages.GetMessagesForUsers(idSender, idReceiver);
            return Ok(messages);
        }


    }
}