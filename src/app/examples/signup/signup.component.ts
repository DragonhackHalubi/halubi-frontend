import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    interests = ["sightseeing", "local cuisine", "adventure sports", "nature", "wellness", "photography", "history", "shopping", "festivals & events", "nightlife", "architecture", "art & museums", "recreation", "geeky stuff", "hidden jams"];
    constructor() { }

    ngOnInit() {}

    changeButton(event: any) {
        console.log(event);
        event.selected = !event.selected;
    }
}
