using AccesaBankAPI.Models;
using AccesaBankAPI.RepositoryInterfaces;
using AccesaBankAPI.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Services
{
    public class MessagesService : IMessagesService
    {
        private IMessageRepository messageRepository;

        public MessagesService(IMessageRepository messageRepository)
        {
            this.messageRepository = messageRepository;
        }

        public Message CreateMessage(Message message)
        {
            if (message.Text.Length == 0)
            {
                throw new APIException("The text can't be empty",400);
            }

            messageRepository.Add(message);
            return message;
        }

        public IList<Message> GetMessagesForUsers(int IdSender, int IdReceiver)
        {
            return this.messageRepository.GetMessages().Where(x =>( x.IdSender == IdSender && x.IdReceiver == IdReceiver)
                                                                 || x.IdSender == IdReceiver && x.IdReceiver ==IdSender)
                .ToList().OrderBy(x => x.Date).ToList();
        }
    }
}
