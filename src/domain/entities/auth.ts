import { ApiProperty } from '@nestjs/swagger';
import { User } from './user';

export class Auth {
  @ApiProperty({
    example: new User({
      id: '5f7f9d6b9d5f3e1f9c3d3b9d',
      name: 'John Doe',
      email: 'vinicius@leprevost.com',
      birthdate: new Date('1995-01-01').toLocaleString(),
      createdAt: new Date('2020-10-08').toLocaleString(),
      doc: '12345678900',
      gender: 'MASC',
      hash: 42176,
      password: 'hashedPassword',
      height: 1.75,
      role: 'USER',
      updatedAt: new Date('2020-10-08').toLocaleString(),
      weigth: 75,
      history: [],
      instructorWorkouts: [],
      sets: [],
      workouts: [],
    }),
    type: User,
  })
  user: User;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Access token',
  })
  accessToken: string;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token',
  })
  refreshToken?: string;
}
