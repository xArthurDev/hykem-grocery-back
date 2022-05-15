import { TokenService } from './token.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.tokenService.validateToken(request.headers.authorization);
  }
}
