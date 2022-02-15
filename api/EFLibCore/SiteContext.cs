using DAL.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace EFLibCore
{
    public class SiteContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public SiteContext()
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            //options.UseSqlServer(Configuration.GetConnectionString("UserDBEntities"));
            options.UseSqlServer("Data Source = localhost; Database = AuditDB; integrated security = True;");

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Apartments>().ToTable("Apartments");
            modelBuilder.Entity<Tenants>().ToTable("Tenants");
            modelBuilder.Entity<Payment>().ToTable("Payment");
            modelBuilder.Entity<AdminLogin>().ToTable("AdminLogin");
        }
        public DbSet<Apartments> Apartments { get; set; }
        public DbSet<Tenants> Tenants { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<AdminLogin> AdminLogin { get; set; }
     

    }
}
