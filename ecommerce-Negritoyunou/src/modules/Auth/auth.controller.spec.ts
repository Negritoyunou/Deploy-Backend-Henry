import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { hash } from 'bcrypt';
import { UserService } from "../Users/users.service";
import { User } from "../Users/users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignUpAuthDto } from "./dto/signup-auth.dto";
import { SignInAuthDto } from "./dto/signin-auth.dto";
import { UserResponseDto } from "../Users/dtos/response-user.dto";
import { AuthService } from "./auth.service";

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const hashedPassword = await hash('123456', 10);
        const mockUserService: Partial<UserService> = {
            findByEmail: (email: string) => {
                if(email === 'johndoe@gmail.com'){
                    return Promise.resolve({
                        email: "johndoe@gmail.com",
                        password: hashedPassword,
                        administrador: "user",
                    } as User)
                } else {
                    return Promise.resolve(undefined)
                }
            },
            createUser: (entityLike: Partial<User>): Promise<User> => 
                Promise.resolve({
                    ...entityLike,
                    administrador: "user",
                    id: "1234fs-1234fs-1234fs-1234fs",
                } as User),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [ AuthService,
                { provide: getRepositoryToken(User), useValue: {} },
                { provide: JwtService, useValue: { signAsync: () => Promise.resolve('mockJwtToken') } },
                { provide: UserService, useValue: mockUserService }
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    const mockSignUpUser = new SignUpAuthDto({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
        passwordConfirm: '123456',
        phone: '123456789',
        address: 'Fake St. 123',
    });

    const mockSignInUser = new SignInAuthDto({
        email: "johndoe@gmail.com",
        password: "123456",
    })

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    it('signUp() should return a new UserResponseDto and create User', async () => {
        const user = await controller.signUp(mockSignUpUser)
        expect(user).toBeDefined()
        expect(user).toBeInstanceOf(UserResponseDto)
        expect(user).toHaveProperty('id')
    })

    it('signIn() should return a token', async () => {
        const token = await controller.signIn(mockSignInUser)
        expect(token).toBeDefined()
        expect(token).toHaveProperty('token')
    })
})