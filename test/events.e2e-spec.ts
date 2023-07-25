import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

let app: INestApplication;
let mod: TestingModule;

describe('Events (e2e)', () => {
  beforeAll(async () => {
    mod = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = mod.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('should return an empty array of events', async () => {
    return request(app.getHttpServer()).get('/events').expect(200).expect({
        "data": [],
        "limit": 10,
        "first": 1,
        "last": 0,
        "total": 0
      });
  })
});
