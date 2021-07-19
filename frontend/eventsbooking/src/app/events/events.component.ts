import { Component, OnInit } from '@angular/core';
import { MockedapiService } from '../mockedapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventsResponse: any;
  loading = true;
  searchText: string;

  constructor(
    private mockedapiService: MockedapiService,
    private router: Router) { }

  ngOnInit(): void {
    this.mockedapiService.getAllEventsDetails().subscribe((result) => {   
      this.eventsResponse = result;
      this.loading = false;
    });    
  }

  handleBooking(id) {
    const route = 'booking/' + id;
    this.router.navigate([route]); 
  }
           
}