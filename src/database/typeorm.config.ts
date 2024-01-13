import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const mySqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: 3306,
  host: `localhost`,
  username: `root`,
  password: `1234`,
  database: `users`,
  synchronize: false,
  entities: [join(__dirname, '..', '**', '**', '*.entity.{js,ts}')],
};
