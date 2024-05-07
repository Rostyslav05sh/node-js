import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UsersByUserIdRepository {
  public async getUserById(userId: string): Promise<IUser> {
    return await User.findOne({userId});
  }

  public async updateUserById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: 'after'
    });
  }

  public async deleteUserById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

  public async getByParams(params: Partial<IUser>): Promise<IUser> {
    return await User.findOne(params)
  }
}

export const usersByUserIdRepository = new UsersByUserIdRepository();
