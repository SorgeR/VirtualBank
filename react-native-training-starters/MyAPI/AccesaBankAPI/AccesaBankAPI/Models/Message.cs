using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccesaBankAPI.Models
{
    public class Message
    {
        public int IdSender;
        public int IdReceiver;
        public string Text;
        public DateTime Date;
    }
}
