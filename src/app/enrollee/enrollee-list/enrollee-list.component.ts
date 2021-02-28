import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Enrollee } from 'src/app/enrollee.model';
import { FormControl,FormGroup,FormArray, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-enrollee-list',
  templateUrl: './enrollee-list.component.html',
  styleUrls: ['./enrollee-list.component.css']
})
export class EnrolleeListComponent implements OnInit {

  enrolleeList : Enrollee[] = [];
  formArray : FormArray = this.fb.array([]);
  enrollForm: FormGroup =new FormGroup({formArray : this.formArray}) ;
  modalOptions:NgbModalOptions;

  constructor(private apiService: ApiService,private fb:FormBuilder,
    private modalService: NgbModal) { 
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
    }

  ngOnInit(): void {
    this.apiService.getEnrolleeList().subscribe((data:any)=>{
      console.log(data);
      this.enrolleeList = data;
      this.createForm();
    });
  }

  private createForm(){
    
    this.enrolleeList.forEach(t => {
      const date = new Date(t.dateOfBirth);
      let enrollForm = this.fb.group({
        id: t.id,
        name: t.name ,
        dateOfBirth : t.dateOfBirth,  
        activationStatus:t.activationStatus
      });
      this.formArray.push(enrollForm);
    });

    this.enrollForm = new FormGroup({formArray : this.formArray});
    
  }

  public updateEnrollee(enrollUser:Enrollee){
    this.apiService.updateEnrollee(enrollUser).subscribe(data => {
      this.modalService.open("Successfully Updated");
    });
  }
  
}
