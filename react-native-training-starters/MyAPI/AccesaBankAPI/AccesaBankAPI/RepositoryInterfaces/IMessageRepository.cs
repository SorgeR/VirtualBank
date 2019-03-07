using AccesaBankAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.RepositoryInterfaces
{
    public interface IMessageRepository
    {
        void Add(Message message);

        IList<Message> GetMessages();
    }
}
