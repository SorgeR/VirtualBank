using AccesaBankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.ServiceInterfaces
{
    public interface IMessagesService
    {
        Message CreateMessage(Message message);

        IList<Message> GetMessagesForUsers(int IdSender, int IdReceiver);

    }
}
