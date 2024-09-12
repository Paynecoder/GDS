// Author: Joshua Payne
using Microsoft.EntityFrameworkCore;

namespace GDSApi.Models
{
    public class GDSContext : DbContext
    {
        public GDSContext(DbContextOptions<GDSContext> options) : base(options) { }

        public DbSet<ResultEntry> Results { get; set; }
    }
}