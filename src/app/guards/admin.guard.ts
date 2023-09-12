import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsuarioServiceService } from '../services/usuario-service.service';



export const AdminGuard = () => {
  const userService = inject(UsuarioServiceService);
  const router = inject(Router);
  if (!userService.isAuthenticated(['admin'])) {
    router.navigate(['/login'])
    return false;
  }
  return true;
}