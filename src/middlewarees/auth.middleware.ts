import {NextFunction, Request, Response} from "express";
import {ApiError} from "../api-error";
import {tokenService} from "../services/token.service";
import {TokenTypeEnum} from "../enums/token-type.enum";
import {tokenRepository} from "../repositories/token.repository";

class AuthMiddleware {
    public async checkAccesToken(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization')
            if (!accessToken) {
                throw new ApiError('No tokens provided', 401)
            }
            const payload = tokenService.checkToken(accessToken, TokenTypeEnum.ACCESS)
            const tokenPair = await tokenRepository.findByParams({accessToken})
            if (!tokenPair) {
                throw new ApiError('Invalid token', 401)
            }
            req.res.locals.jwtPayload = payload
            next()
        } catch (e) {
            next(e)
        }
    }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization')
            if (!refreshToken) {
                throw new ApiError('No tokens provided', 401)
            }

            const payload = tokenService.checkToken(refreshToken, TokenTypeEnum.REFRESH)
            const tokenPair = await tokenRepository.findByParams({refreshToken})
            if (!tokenPair) {
                throw new ApiError('Invalid token1', 401)
            }
            req.res.locals.jwtPayload = payload
            req.res.locals.tokenPair = tokenPair
            next()
        } catch (e) {
            next(e)
        }
    }
}

export const authMiddleware = new AuthMiddleware();