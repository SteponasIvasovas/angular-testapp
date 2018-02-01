import { Component, OnInit } from '@angular/core';
// number of animation specific functions
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { DataService } from '../data.service';

//component decorator
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //styles : ['
  //css go here
  //']
  styleUrls: ['./home.component.scss'],
  animations: [
    //trigger(nameOfAnimation, ..)
    trigger('goals', [
      //* => * === any to any transition, gets activated when element goes from any state
      //to any state
      transition('* => *', [
        query(':enter', style({ opacity: 0}), {optional: true}),
        //300 ms time between animations
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount: number;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals = [];

  constructor(private _data: DataService) { }

  //initiated when the app/component loads
  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

}
