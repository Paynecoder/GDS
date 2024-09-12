// Author: Joshua Payne
using System.ComponentModel.DataAnnotations;
namespace GDSApi.Models
{
    // Represents a result entry with a key and a result value.
    public class ResultEntry
    {
        [Key]
        public int Key { get; set; }
        public int? Result { get; set; }
    }
}