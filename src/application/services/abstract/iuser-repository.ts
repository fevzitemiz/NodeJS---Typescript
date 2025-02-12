import { UserDto } from "../../../domain/dtos/user-dtos";
import IBaseRepository from "./ibase.repository";

// IUserRepository.ts
export interface IUserRepository extends IBaseRepository<UserDto> {
  updatePassword(id: string, newPassword: string, oldPassword: string): Promise<boolean>;
}