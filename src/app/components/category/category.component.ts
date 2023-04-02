import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() img:any
  @Input() title:any
  @Input() description:any
  constructor() { }

  ngOnInit(): void {
  }

}
