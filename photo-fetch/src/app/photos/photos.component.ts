import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  photoUrl = '';

  constructor(private photoService: PhotosService) {}

  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto() {
    this.photoService.getPhoto().subscribe((res) => {
      this.photoUrl = res.urls.regular;
    });
  }
}
