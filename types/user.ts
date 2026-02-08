import { User as UserType } from '@/lib/generated/prisma/client';

export type User = Omit<UserType, 'password' | 'updatedAt'>;
