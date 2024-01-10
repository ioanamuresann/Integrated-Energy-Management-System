import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector,private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdminRequired = this.reflector.getAllAndOverride<boolean>('isAdmin', [context.getHandler(), context.getClass()]);
    if (!isAdminRequired) {
      return true; 
    }

    const request = context.switchToHttp().getRequest().headers.authorization;
    const parts = request.split(' ');
    const token = parts[1];
    const decoded = this.jwtService.verify(token);
    const isAdmin = decoded.isAdmin;

    return isAdmin;
  }
}