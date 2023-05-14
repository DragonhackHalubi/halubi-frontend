import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-basicelements',
  templateUrl: './basicelements.component.html',
  styleUrls: ['./basicelements.component.scss']
})
export class BasicelementsComponent implements OnInit {
    simpleSlider = 40;
    doubleSlider = [20, 60];
    state_default: boolean = true;
    focus: any;

    @Input("feeling")
    feeling;

    showRecommendation = false;

    recommend: string = "How about visiting Val di Non, located in Trentino-Alto Adige in North Italy. It is a stunning valley with beautiful scenery, charming villages, and delicious local cuisine.";

    constructor() { }

    ngOnInit() {}

    getFeeling() {
        return this.feeling;
    }

    onSubmit($event: any) {
        this.showRecommendation = true;
    }
}
