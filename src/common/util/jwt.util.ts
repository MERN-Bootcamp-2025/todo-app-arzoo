import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'thisissupersecretjwtaccesstokenblabla'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'thisissupersecretjwtrefreshtokenllalla'


export function generateAccessToken(payload: object): string{
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '20m'});
}

export function generateRefershToken(payload: object): string{
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}

export function verifyToken(token: string) {
     return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token: string) {
     return jwt.verify(token, REFRESH_TOKEN_SECRET);
}