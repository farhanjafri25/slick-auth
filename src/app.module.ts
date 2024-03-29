import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mySqlConfig } from './database/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(mySqlConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
