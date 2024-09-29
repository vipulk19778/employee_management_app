import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IParentDept } from '../../model/interface/master';

@Component({
  selector: 'app-employee',
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EmployeeComponent implements OnInit {
  // Model for employee form
  employee = {
    name: '',
    contactNo: '',
    email: '',
    parentDepartment: '',
    childDepartment: '',
    password: '',
    role: '',
    gender: '',
  };

  // List of departments for the dropdown
  departments: string[] = [
    'HR',
    'Development',
    'Marketing',
    'Sales',
    'Finance',
  ];

  constructor() {}

  // Method to handle form submission
  onSubmit() {
    // Logic to handle form submission
    if (this.isFormValid()) {
      console.log('Employee Data:', this.employee);
      // You can perform API call or further logic here
      alert('Form Submitted Successfully!');
      this.resetForm(); // Reset the form after submission
    } else {
      alert('Please fill all the required fields');
    }
  }

  // Method to check if the form is valid
  isFormValid() {
    return (
      this.employee.name &&
      this.employee.contactNo &&
      this.employee.email &&
      this.employee.parentDepartment &&
      this.employee.childDepartment &&
      this.employee.password &&
      this.employee.role &&
      this.employee.gender
    );
  }

  // Method to reset the form
  resetForm() {
    this.employee = {
      name: '',
      contactNo: '',
      email: '',
      parentDepartment: '',
      childDepartment: '',
      password: '',
      role: '',
      gender: '',
    };
  }

  isFormVisible = signal<boolean>(false);
  masterSrv = inject(MasterService);
  parentDeptList = signal<IParentDept[]>([]);

  ngOnInit(): void {
    this.getParentDept();
  }

  getParentDept() {
    this.masterSrv.getAllDept().subscribe((res: IApiResponse) => {
      this.parentDeptList.set(res.data);
    });
  }
}
