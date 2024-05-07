import { usersByUserIdRepository } from "../repositories/users.by.userId.repository";
import { IUser } from "../interfaces/user.interface";
import {ApiError} from "../api-error";

class UsersByUserIdService {

  public async getById(userId: string): Promise<IUser> {
    return await this.findUserOrThrow(userId);
  }

  public async getMe(userId: string) {
    return await this.findUserOrThrow(userId)
  }

  public async updateMe(userId: string, dto: Partial<IUser>) {
    await this.findUserOrThrow(userId)
    return await usersByUserIdRepository.updateUserById(userId, dto);
  }


  public async deleteMe(userId: string) {
    await usersByUserIdRepository.deleteUserById(userId);
    await usersByUserIdRepository.updateUserById(userId, {isDeleted: true})
  }

  private async findUserOrThrow(userId: string): Promise<IUser> {
    const user = await usersByUserIdRepository.getUserById(userId);
    if (!user) {
      throw new ApiError("user not found1", 404);
    }
    return user;
  }
}

export const usersByUserIdService = new UsersByUserIdService();
