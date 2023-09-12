import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuarios: any;

  constructor(private usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {
    this.obtener();
  }

  obtener() {
    this.usuarioService.obtener().subscribe(data => {
      console.log(data)
      this.usuarios = data;

      console.log(this.usuarios);
    })
  }


}
