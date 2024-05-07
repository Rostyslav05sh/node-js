import {usersByUserIdRepository} from "../repositories/users.by.userId.repository";
import {ApiError} from "../api-error";
import {IUser} from "../interfaces/user.interface";
import {passwordService} from "./password.service";
import {userRepository} from "../repositories/user.repository";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {IToken, ITokenResponse} from "../interfaces/token.interface";
import {IJWTPayload} from "../interfaces/jwt-payloade.interface";

class AuthService {
    public async signUp(dto: Partial<IUser>) {
        await this.isEmailExist(dto.email)
        const hashedPassword = await passwordService.hashedPassword(dto.password)
        const user = await userRepository.create({
                ...dto,
                password: hashedPassword
            }
        )
        const tokens = tokenService.generatePair({
            userId: user._id,
            role: user.role
        })

        await tokenRepository.create({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            _userId: user._id
        })

        return {
            user,
            tokens
        }
    }

    public async signIn(dto: {email: string, password: string}): Promise<{user: IUser, tokens: ITokenResponse}> {
        const user = await usersByUserIdRepository.getByParams({ email: dto.email });
        if (!user) {
            throw new ApiError("Wrong email or password", 401)
        }

        const isCompare = await passwordService.comparePassword(
            dto.password,
            user.password
        )
        if (!isCompare) {
            throw new ApiError("Wrong email or password", 401)
        }
        const tokens = tokenService.generatePair({
            userId: user._id,
            role: user.role
        })

        await tokenRepository.create({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            _userId: user._id
        })

        return {
            user,
            tokens
        }
    }

    public async refresh(jwtPayload: IJWTPayload, oldTokens: IToken): Promise<ITokenResponse> {
    const newPair = tokenService.generatePair({
        userId: jwtPayload.userId,
        role: jwtPayload.role
    })
        await tokenRepository.deleteById(oldTokens._id)
        await tokenRepository.create({
            ...newPair,
            _userId: jwtPayload.userId
        })
        console.log(jwtPayload.userId)

        return newPair
    }

    public async isEmailExist(email: string) {
        const user = await usersByUserIdRepository.getByParams({email})
        if (user) {
            throw new ApiError("Email already exist", 404)
        }

    }
}

export const authService = new AuthService();