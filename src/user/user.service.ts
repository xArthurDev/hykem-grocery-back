/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { UpdateUserModel, UserModel } from './user.model';
import prisma from 'prisma/prisma-instance';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  usersRepository = prisma.users;

  async getAllUsers(): Promise<UserModel[]> {
    return this.usersRepository.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });
  }

  async createUser(user: UserModel): Promise<UserModel> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user = { ...user, password: hashedPassword };
    return this.usersRepository.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: { ...user, isDeleted: false },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });
  }

  async updateUser(user: UpdateUserModel, id: string): Promise<UserModel> {
    const retrievedUserData = await this.getUserDetailsWithPassword(id);
    const updatedUserData = {
      ...retrievedUserData,
      ...user,
    };
    return this.usersRepository.update({
      where: { id },
      data: { ...updatedUserData },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });
  }

  async deleteUser(id: string): Promise<UserModel> {
    const retrievedUserData = await this.getUserDetails(id);
    delete retrievedUserData.id;
    return this.usersRepository.update({
      where: { id },
      data: { ...retrievedUserData, isDeleted: true },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });
  }

  async getUserDetailsByEmail(email: string): Promise<UserModel> {
    return this.usersRepository.findFirst({
      where: { email, isDeleted: false },
    });
  }

  async getUserDetails(id: string): Promise<UserModel> {
    return this.usersRepository.findFirst({
      where: { id, isDeleted: false },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });
  }

  async getUserDetailsWithPassword(id: string): Promise<UpdateUserModel> {
    return this.usersRepository.findFirst({
      where: { id, isDeleted: false },
      select: {
        id: false,
        name: true,
        username: true,
        email: true,
        password: true,
      },
    });
  }
}
