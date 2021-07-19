import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockedapiService } from '../mockedapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  submitted = false;
  error = '';
  eventsResponse: any;
  numberOfSeatsOptions = [2,3,4,5,6];
  numberOfSeatsCustomError = false;
  attendeeArray = ['attendee2','attendee3','attendee4','attendee5','attendee6']
  displayAttendee = [false, false, false, false, false]

  constructor(
    private activatedRoute: ActivatedRoute,
    private mockedapiService: MockedapiService,
    private formBuilder: FormBuilder) { 
    const event_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.mockedapiService.getOneEventsDetails(event_id).subscribe((result) => {   
      this.eventsResponse = result;
    });
  }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0) ?[0-9]{10}$')]],
      numberOfSeats: ['', Validators.required],
      attendee2: [''],
      attendee3: [''],
      attendee4: [''],
      attendee5: [''],
      attendee6: ['']
    });

    this.bookingForm.valueChanges.subscribe((submitValue) => {

      // check number of seats - if user selects greater value than available, throw an error
      if (submitValue.numberOfSeats > this.eventsResponse.available_seats){
        this.numberOfSeatsCustomError = true;
      }
      else {
        this.numberOfSeatsCustomError = false;
      }

      // to display input tags dynamically
      if (!this.numberOfSeatsCustomError){
        this.displayAttendee = [false, false, false, false, false]
        for ( let i=0; i < submitValue.numberOfSeats - 1; i++){
          this.displayAttendee[i] = true;
        }
      }
      
      // to set custom validators
      for (let index in this.displayAttendee) {
        if (this.displayAttendee[index]) {
          this.bookingForm.controls[this.attendeeArray[index]].setValidators([Validators.required]);
        }
      }

      if (this.bookingForm.invalid) {
        this.submitted = false;
      }

    })
  }

  get f() { return this.bookingForm.controls; }

  onSubmit() {
    console.log(this.bookingForm)
    if (this.bookingForm.invalid) {
      console.log("Invalid form")
    }
    if (this.bookingForm.valid) {
      console.log("Submitted form values are as follows ", this.bookingForm.value);
    }
    if (!this.numberOfSeatsCustomError){
      this.submitted = true;
      window.scrollTo(0,0);
    }
    return;
  }

}
