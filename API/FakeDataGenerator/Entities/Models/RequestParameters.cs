using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class RequestParameters
    {
        [Required]
        public Regions Region { get; set; }
        
        [Required]
        public double MistakesRate { get; set; }
        
        [Required]
        public int Seed { get; set; }
        
        [Required]
        public int PageNumber { get; set; }
    }
}
