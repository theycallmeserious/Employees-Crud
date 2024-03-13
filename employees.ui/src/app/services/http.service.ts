import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:44374/api"

  constructor(private http : HttpClient) { }

  getAllEmployees() {
    return this.http.get<IEmployee[]>(this.apiUrl + "/Employees/GetAllEmployees")
  }
  createEmployee(employee : IEmployee) {
    return this.http.post(this.apiUrl + "/Employees/AddEmployee", employee)
  }
  getOneEmployee(employeeId : number) {
    return this.http.get<IEmployee>(this.apiUrl + "/Employees/GetSpecificEmployee/" + employeeId)
  }
  updateEmployee(employeeId : number, employee : IEmployee) {
    return this.http.put<IEmployee>(this.apiUrl + "/Employees/UpdateEmployee/" + employeeId, employee)
  }
  deleteEmployee(employeeId : number) {
    return this.http.delete<IEmployee>(this.apiUrl + "/Employees/DeleteEmployee/" + employeeId)
  }


}
