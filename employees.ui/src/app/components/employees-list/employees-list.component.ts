import { Component } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../services/http.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'salary', 'age', 'edit and delete'];

  employeeList: IEmployee[] = []

  constructor(private httpService : HttpService,
    private router : Router,
    private toaster : ToastrService){}

  ngOnInit(){
    this.getEmployeesFromServer()
  }

  getEmployeesFromServer(){
    this.httpService.getAllEmployees().subscribe((res) => {
      this.employeeList = res
    })
  }

  edit(id : number){
    this.router.navigateByUrl("/employee/" + id)
  }

  delete(id : number){
    this.httpService.deleteEmployee(id).subscribe(() => {
      // this.employeeList = this.employeeList.filter(x => x.employeeId! = id)
      this.toaster.success("Record Deleted Successfully.")
      this.getEmployeesFromServer()
    })
  }

}
