import * as jsonwebtoken from "jsonwebtoken";
import {config} from "../configs/config";
import {IJWTPayload} from "../interfaces/jwt-payloade.interface";
import {TokenTypeEnum} from "../enums/token-type.enum";
import {ApiError} from "../api-error";
import {ITokenResponse} from "../interfaces/token.interface";

class TokenService {
    public generatePair(payload: IJWTPayload): ITokenResponse {
        const accessToken = jsonwebtoken.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_EXPIRES_IN
        });
        const refreshToken = jsonwebtoken.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_EXPIRES_IN
        })
        return {accessToken, accessExpiresIn: config.JWT_ACCESS_EXPIRES_IN, refreshToken, refreshExpiresIn: config.JWT_REFRESH_EXPIRES_IN}
    }

    public async checkToken(token: string, type: TokenTypeEnum) {
        try {
            let secret: string

            switch (type) {
                case (TokenTypeEnum.ACCESS): {
                    secret = config.JWT_ACCESS_SECRET
                    break;
                }
                case (TokenTypeEnum.REFRESH): {
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                }
                default: {
                    throw new ApiError("Invalid token type", 401)
                }
            }
            return jsonwebtoken.verify(token, secret) as IJWTPayload
        } catch (e) {
            throw new ApiError("Token is not valid", 401)
        }
    }
}

export const tokenService = new TokenService();