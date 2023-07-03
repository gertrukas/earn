import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-news4',
  templateUrl: './news4.component.html',
  styleUrls: ['./news4.component.sass']
})

export class News4Component implements OnInit {



  blogs: any[]= [];

  constructor(private service: NewsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getNews4().subscribe(response => {
      this.blogs= response.blogsLimit;
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
