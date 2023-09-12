import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public usuario: any = {};



  constructor(private toastrService: ToastrService, private _loginService: UsuarioServiceService, private _router: Router) { }


  ngOnInit(): void {

  }

  login(loginForm: any) {
    if (loginForm.valid) {
      var data = {
        correo: this.user.correo,
        password: this.user.password
      }
      this._loginService.loginUser(data).subscribe(
        response => {
          if (response.data == undefined) {
            this.toastrService.error(response.message)

          } else {
            this.usuario = response.data;
            this.toastrService.success("Inicio de sesión correcto!!!")
            localStorage.setItem('token', response.token);
            this._router.navigate(['/'])

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

  onClick() {
    this._router.navigate(['/login'])
  }

}
