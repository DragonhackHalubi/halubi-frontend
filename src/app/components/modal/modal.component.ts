import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-modal-content',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">New trip</h4>
            <button type="button" class="close" (click)="cancel()">&times;</button>
        </div>
        <div class="modal-body">
            <form [formGroup]="form">
                <div formArrayName="rows">
                    <div *ngFor="let row of rows.controls; let i = index" [formGroupName]="i" class="row">
                        <div class="form-group">
                            <label for="startDate">Start Date:</label>
                            <input type="date" id="startDate" formControlName="startDate" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="endDate">End Date:</label>
                            <input type="date" id="endDate" formControlName="endDate" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <input type="text" id="description" formControlName="description" class="form-control">
                        </div>
                        <!-- Add more input fields here as needed -->
                    </div>
                </div>
                <button type="button" (click)="addRow()" class="btn btn-primary">Add Row</button>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" (click)="save()" class="btn btn-success">Save</button>
            <button type="button" (click)="cancel()" class="btn btn-secondary">Cancel</button>
        </div>


    `
})
export class NgbdModalContent implements OnInit{
    form: FormGroup;
    constructor(private fb: FormBuilder, private http: HttpClient, public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.form = this.fb.group({
            rows: this.fb.array([])
        });
    }

    get rows(): FormArray {
        return this.form.get('rows') as FormArray;
    }

    addRow() {
        const newRow = this.fb.group({
            startDate: [''],
            endDate: [''],
            description: ['']
        });
        this.rows.push(newRow);
    }

    removeRow(index: number) {
        this.rows.removeAt(index);
    }

    save() {
        // Do something with the data, e.g., save it
        const data = this.rows.value;
        const transformedData = data.map(item => {
            const startDateParts = item.startDate.split('/');
            const transformedStartDate = startDateParts[0] + '.' + startDateParts[1];
            return {
                date: transformedStartDate,
                location: item.description
            };
        });
        this.http.get('http://localhost:5000/trips/suggestion', transformedData).subscribe(
            response => {
                console.log('Data sent successfully:', response);
                this.activeModal.close();
            },
            error => {
                console.log('Error sending data:', error);
            }
        );
        console.log(data);
        this.activeModal.close(data);
    }

    cancel() {
        this.activeModal.dismiss('Canceled');
    }
}

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html'
})
export class NgbdModalComponent {

    http: HttpClient;

    constructor(private modalService: NgbModal) {}
    open() {
        const modalRef = this.modalService.open(NgbdModalContent);
        // modalRef.componentInstance.http = this.http; // Pass the HttpClient instance to the modal component
        modalRef.componentInstance.name = 'World';
    }
}
