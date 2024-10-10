import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common"
import { AppModule } from "src/app.module";
import { UserService } from "src/modules/Users/users.service";
import { TypeOrmTestModule } from "test/typeorm-testing-config";
import { hash } from 'bcrypt';
import { User } from "src/modules/Users/users.entity";
import * as request from 'supertest';

describe('Users (e2e)', () => {
    let app: INestApplication;
    let authToken: string;
    let userService: UserService;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule, TypeOrmTestModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init()

        userService = moduleFixture.get<UserService>(UserService);

        const hashedPassword = await hash('123456', 10);
        jest.spyOn(userService, 'findByEmail').mockImplementation(async (email) => {
            if(email === 'johndoe@gmail.com'){
                return Promise.resolve({
                    email: "johndoe@gmail.com",
                    password: hashedPassword,
                    administrador: "user",
                } as User)
            } else {
                return Promise.resolve(undefined)
            }
        });

        jest.spyOn(userService, 'findAll').mockImplementation(async () => {
            return Promise.resolve([
                {
                    email: 'johndoe@gmail.com',
                    administrador: 'user',
                },
            ] as User[]);
        });

        const loginResponse = await request(app.getHttpServer())
        .post('/auth/sigin')
        .send({
            email: 'johndoe@gmail.com',
            password:   '123456',
        });

        authToken = loginResponse.body['token'];
    })

    afterEach(async () => {
        await app.close();
    });

    it('/user (GET) Returns array with users and OK status code', async () => {
        const req = await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${authToken}`);
        
        expect(req.status).toBe(HttpStatus.OK)
        expect(req.body).toBeInstanceOf(Array)
    })
})