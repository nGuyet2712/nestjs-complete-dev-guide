import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    // run before the req is handled

    return handler.handle().pipe(
      map((data: any) => {
        // run before the response is sent
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // remove properties doesnt include in dto
        });
      }),
    );
  }
}
