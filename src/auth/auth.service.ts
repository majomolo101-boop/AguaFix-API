import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, name, isNotificationEnabled } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado.');
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isNotificationEnabled: isNotificationEnabled ?? true,
    });

    await this.userRepository.save(newUser);
    
    // Ocultar contraseña antes de retornar
    const { password: _, ...result } = newUser;
    return result;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const { password: _, ...result } = user;
    return {
      message: 'Login exitoso',
      user: result,
    };
  }
}