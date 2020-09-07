import { Component, OnInit } from '@angular/core';
import { Department } from 'src/models/department';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.scss']
})
export class EmployeeformComponent implements OnInit {

  title = 'Create';
  employeeId: string;
  errorMessage: any;
  employee = new Employee();
  cityList: Department[];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router, ) {
    if (this.route.snapshot.params['id']) {
      this.employeeId = this.route.snapshot.paramMap.get('id');
      this.title = 'Edit';
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (result: Employee) => {
          if (result) {
            this.employee = result;
            console.log(this.employee)
          }
        }
      );
    }
  }

  ngOnInit() {
    this.employeeService.getCityList().subscribe(
      (data: Department[]) => this.cityList = data
    );

    if (this.employeeId) {
      
    }
  }

  onEmployeeFormSubmit() {
    if (this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, this.employee).then(
        () => {
          this.router.navigate(['/']);
        }
      );
    } else {
      this.employeeService.saveEmployee(this.employee).then(
        () => {
          this.router.navigate(['/']);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
