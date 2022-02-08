import { Component, OnInit, Input } from '@angular/core';
import { Term } from '../../models/termconditon';

@Component({
  selector: 'uzone-term-condition',
  templateUrl: './uzone-term-condition.component.html',
  styles: []
})

export class TermConditionComponent implements OnInit {
@Input() termconditionpage: any;

  constructor() { }

  ngOnInit() { 
  }

}
