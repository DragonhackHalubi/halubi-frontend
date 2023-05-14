import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-components',
    templateUrl: './home.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    app-modal-component {
        z-index: 10 !important;
    }
    .carousel-caption {
        color: white !important;
    }
    .carousel-create {
        
    }
        
    `]
})

export class HomeComponent implements OnInit {
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: {year: number, month: number};
    model: NgbDateStruct;
    // trips: {"trip_id": number, "user_id": number, "trip_json": {"location": string, "activities": string[]}}[]
    trips: any = [{ "trip_id": 1, "user_id": 1, "trip_json": [ {"location": "Ljubljana", "activities": ["Zmajski most", "Ljubljanski grad", "Nebotičnik"] },
            {"location": "Koper", "activities": ["swimming"]}]},
            { "trip_id": 2, "user_id": 1, "trip_json": [ {"location": "London", "activities": ["London Eye", "Tower bridge"] },
                {"location": "Cambridge", "activities": ["University"]}]},
            { "trip_id": 3, "user_id": 1, "trip_json": [ {"location": "Monaco", "activities": ["Beach restaurant", "swimming"] },
                {"location": "Saint-Tropez", "activities": ["special coctails"]},
                {"location": "Genova", "activities": ["local pasta"]}]}];
    constructor( private renderer : Renderer2) {}
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }

    create() {

    }

    tripName(trip: any) {
        let places = [];
        for (let i = 0; i < trip["trip_json"].length; i++) {
            let new_place = trip["trip_json"][i]["location"];
            if (!(new_place in places)) places.push(new_place);
        }
        return places.join('-');
    }

    location(trip: any) {
        return trip["trip_json"][0]["location"].toLowerCase();
    }

    getTrips() {
        return this.trips;
    }
}
