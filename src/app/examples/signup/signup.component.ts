import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    selectedInterests = [];
    interests = ["sightseeing", "local cuisine", "adventure sports", "nature", "wellness", "photography", "history", "shopping", "festivals & events", "nightlife", "architecture", "art & museums", "recreation", "geeky stuff", "hidden jams"];
    constructor(private router: Router) {}

    ngOnInit() {}

    selectInterest(event: any) {
        console.log(this.selectedInterests);
        this.selectedInterests.push(event.srcElement.innerText);
    }

    isSelected(item: any) {
        return this.selectedInterests.includes(item.toUpperCase());
    }

    registerUser() {
        this.router.navigate(['/home']);
    }
}
