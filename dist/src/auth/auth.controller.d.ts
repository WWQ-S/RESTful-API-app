import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(LoginUserDto: LoginUserDto, req: any): Promise<{
        id: string;
        email: string;
        token: string;
    }>;
    getProfile(req: any): any;
}
