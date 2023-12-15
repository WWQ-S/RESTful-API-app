import { Inject, Injectable } from '@nestjs/common';
import { ConfigFactoryKeyHost, ConfigType, registerAs } from '@nestjs/config';

//const a = registerAs('asd', () => ({
//  hi: 'sho',
//}));
//
//a.KEY;
@Injectable()
export class AppService {
  //constructor(
  //  @Inject(a.KEY)
  //  private config: ConfigType<typeof a>,
  //) {
  //  config.hi;
  //}

  getHello(): string {
    return 'Hello World!';
  }
}
