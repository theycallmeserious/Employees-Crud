using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using employee.api.Data;

namespace employee.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        [Route("GetAllEmployees")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet]
        [Route("GetSpecificEmployee/{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null) { return NotFound(); }

            return employee;
        }

        [HttpPut]
        [Route("UpdateEmployee/{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            var employeeFromDB = await _context.Employees.FindAsync(id);
            
            employeeFromDB.EmployeeName = employee.EmployeeName;
            employeeFromDB.EmployeeEmail = employee.EmployeeEmail;
            employeeFromDB.EmployeePhone = employee.EmployeePhone;
            employeeFromDB.EmployeeSalary = employee.EmployeeSalary;
            employeeFromDB.EmployeeAge = employee.EmployeeAge;

            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpPost]
        [Route("AddEmployee")]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete]
        [Route("DeleteEmployee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) { return NotFound(); }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

    }
}
