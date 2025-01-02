// example context class for a database

using Microsoft.EntityFrameworkCore;

namespace DnDStore.Backend.Models
{
    public class DnDStoreContext : DbContext
    {
        public DnDStoreContext(DbContextOptions<DnDStoreContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}
