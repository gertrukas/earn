import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})

export class NewsComponent implements OnInit {

  blogs: any[] = [];

  constructor(private service: NewsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getNews().subscribe(response => {
      this.blogs = response.blogs;
      }, error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Error al recibir la informacion',
          timer: 2000
        });
      });
  }

}
