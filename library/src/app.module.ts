import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { BookCommentsModule } from './bookComments/bookComments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DBURL || ""),
    BooksModule,
    UsersModule,
    AuthModule,
    BookCommentsModule,
  ],
  controllers: [AppController],
  providers: [AuthService, JwtService],
})
export class AppModule {}
