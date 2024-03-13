using employee.api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace employee.api.Configurations
{
    public class EmployeeTypeConfigurations : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(k => k.EmployeeId);
            builder.Property(pr => pr.EmployeeId).IsRequired();
            builder.Property(n => n.EmployeeName).IsRequired().HasMaxLength(100);
            builder.Property(e => e.EmployeeEmail).IsRequired().HasMaxLength(100);
            builder.Property(p => p.EmployeePhone).IsRequired().HasMaxLength(11);
            builder.Property(s => s.EmployeeSalary).IsRequired();
            builder.Property(g => g.EmployeeAge).IsRequired();
        }
    }
}
