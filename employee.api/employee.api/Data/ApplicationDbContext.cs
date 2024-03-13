using employee.api.Configurations;
using Microsoft.EntityFrameworkCore;

namespace employee.api.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            new EmployeeTypeConfigurations().Configure(modelBuilder.Entity<Employee>());
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
