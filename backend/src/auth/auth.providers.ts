import { Auth } from './entities/auth.entity';

export const usersProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: Auth,
  },
];
