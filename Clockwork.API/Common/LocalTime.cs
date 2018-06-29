using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clockwork.API.Common
{
    public class LocalTime
    {
        public int month { get; set; }
        public int day { get; set; }
        public int year { get; set; }
        public int hours { get; set; }
        public int minutes { get; set; }
        public int seconds { get; set; }
    }
}
