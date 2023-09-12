import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user: any = {};


  constructor(private toastrService: ToastrService, private _registroService: UsuarioServiceService, private _router: Router) {


  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      var data = {
        correo: this.user.correo,
        password: this.user.password,
        rol: this.user.rol
      }

      this._registroService.crear_usuario(data).subscribe(
        response => {
          if (response.data == undefined) {
            this.toastrService.error(response.message)

          } else {
            this.user = response.data;
            this.toastrService.success("Registro Correcto!!!")
            this._router.navigate(['/login'])

          }

        },
        error => {
          console.log(error)

        }
      )

    } else {

      this.toastrService.error("Verifica los datos ingresados")

    }

  }

}
