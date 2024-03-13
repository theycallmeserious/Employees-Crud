import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  constructor(private formBuilder : FormBuilder,
    private httpService : HttpService,
    private router : Router,
    private route : ActivatedRoute,
    private toaster : ToastrService) {}

  employeeForm = this.formBuilder.group({
    employeeName : [''],
    employeeEmail : ['', Validators.email],
    employeePhone : [''],
    employeeSalary : [0],
    employeeAge : [5]
  })

  empId! : number;
  isEdit = false
  ngOnInit(){
    this.empId = this.route.snapshot.params['id']
    if(this.empId) {
      this.isEdit = true
      this.httpService.getOneEmployee(this.empId).subscribe(res => {
        this.employeeForm.patchValue(res)
        this.employeeForm.controls.employeeEmail.disable()
      })
    }
  }

  save(){
    const employee : IEmployee = {
      employeeName : this.employeeForm.value.employeeName!,
      employeeEmail : this.employeeForm.value.employeeEmail!,
      employeePhone : this.employeeForm.value.employeePhone!,
      employeeAge : this.employeeForm.value.employeeAge!,
      employeeSalary : this.employeeForm.value.employeeSalary!
    }
    if(this.isEdit) {
      this.httpService.updateEmployee(this.empId, employee).subscribe(() => {
        this.toaster.success("Record Updated Successfully.")
        this.router.navigateByUrl("/employees-list")
      })
    }
    else {
      this.httpService.createEmployee(employee).subscribe(() => {
        this.toaster.success("Record Added Successfully.")
        this.router.navigateByUrl("/employees-list")
      })
    }
  }
}
