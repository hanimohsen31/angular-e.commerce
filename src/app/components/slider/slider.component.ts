import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  imgs = [
    'https://images2.imgbox.com/fb/47/9oR4qCOg_o.jpg',
    'https://images2.imgbox.com/59/0a/tkMtITMM_o.jpg',
  ];
  vid = [
    'https://firebasestorage.googleapis.com/v0/b/angular-ecommerce.appspot.com/o/videoplayback2.mp4?alt=media&token=c1ba64f2-075f-40ed-9900-00ce650d5244',
  ];
}
