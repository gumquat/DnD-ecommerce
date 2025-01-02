using Microsoft.EntityFrameworkCore;
using Product = DnDStore.Backend.Models.Product;

namespace DnDStore.Backend.Data
{
    public class DnDStoreContext : DbContext // Changed from ApplicationDbContext
    {
        public DnDStoreContext(DbContextOptions<DnDStoreContext> options)
            : base(options) { }

        // Define your DbSets (tables) here
        public DbSet<Product> Products { get; set; }
    }
}
