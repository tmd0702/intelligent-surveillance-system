import {AuthDto} from "../dtos/auth.dto";
import {UserDto} from '../../users/dtos/user.dto';
const jwt = require('jsonwebtoken');
import {db} from '../../index';
const config = require("config");
const Authentication = {
    generateTokens: async (user: UserDto) => {
        try {
            const payload = {_id: user.id};
            const accessToken = jwt.sign(
                payload,
                config.get("JWT.ACCESS_TOKEN.PRIVATE_KEY"),
                {expiresIn: config.get("JWT.ACCESS_TOKEN.EXPIRES_IN")}
            );
            const refreshToken = jwt.sign(
                payload,
                config.get("JWT.REFRESH_TOKEN.PRIVATE_KEY"),
                { expiresIn: config.get("JWT.REFRESH_TOKEN.EXPIRES_IN")}
            );
            return Promise.resolve({accessToken, refreshToken});
        } catch(err) {
            return Promise.reject(err);
        }
    },
    verifyRefreshToken: async (refreshToken: string) => {
        const privateKey = config.get("JWT.REFRESH_TOKEN.PRIVATE_KEY");
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, privateKey, (err: Error, tokenDetails: any) => {
                if (err) {
                    return reject({ error: true, message: "Invalid refresh token"});
                } else {
                    return resolve({
                        tokenDetails,
                        error: false,
                        message: "Valid refresh token"
                    })
                }
            })
        })
    },
    verifyOTP: async (userId: string, otp: string) => {
        try {
            const trueOTP = await Authentication.findByUserID(userId);
            return trueOTP === otp;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    signOut: async (userId: string) => {
        try {
            const isTokenUpdated = await Authentication.updateRefreshToken(null, userId);
            return isTokenUpdated;
        } catch(err) {
            throw err;
        }
    },
    signIn: async (identifier: string, password: string) => {
        try {
            const result = await db.raw('SELECT fn_sign_in(:identifier, :password) as user_info', { identifier, password });
            return result.rows[0].user_info;
        } catch (error) {
            throw error;
        };
    },
    signUp: async (firstName: string, lastName: string, email: string, phoneNumber: string, dob: Date, password: string) => {
        try {
            const userInfo = (await db.raw('SELECT fn_sign_up(:firstName, :lastName, :email, :phoneNumber, :dob, :password) as user_info', { firstName, lastName, email, phoneNumber, dob, password })).rows[0].user_info;
            return userInfo;
        } catch (error) {
            console.log("Sign up error2:", firstName, lastName, email, phoneNumber, dob, password);
            throw error;
        };
    },
    create: async(authDetails: AuthDto) => {
        try {
            let row = await db('authentication').insert(authDetails).returning('*');
            return (row.length > 0);
        } catch (err) {
            throw err;
        }

    },
    updateByUserID: async(userID: string, newDetails: AuthDto) => {
        try {
            let row = await db('authentication').update(newDetails).where({
                user_id: userID
            }).returning('*');
            return (row.length > 0);
        } catch (err) {
            throw err;
        }
    },
    findByUserID: async(userID: string) => {
        try {
            let rows = await db.select("*").from("authentication").where("user_id", userID)
            if (rows.length) {
                return rows[0]
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    },
    findTokenByUserID: async (userID: string) => {
        try {
            let rows = await db.select("refresh_token").from("authentication").where("user_id", userID)
            if (rows.length) {
                return rows[0]
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    },
    findAccountByVerifyToken: async (verifyToken: string) => {
        try {
            let rows = await db.select("*").from("authentication").where("verify_token", verifyToken)
            if (rows.length) {
                return rows[0]
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    },
    findPasswordByUserID: async (userID: string) => {
        try {
            let rows = await db.select("encrypted_password").from("authentication").where("user_id", userID);
            if (rows.length) {
                return rows[0];
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    },
    updateRefreshToken: async (newRefreshToken: string | null, userID: string) => {
        try {
            let row = await db('authentication').update({
                refresh_token: newRefreshToken,
            }).where('user_id', userID).returning('*');
            return (row.length > 0);
        } catch (err) {
            throw err;
        }
    },
    updateVerifyToken: async(newVerifyToken: string, userID: string) => {
        try {
            let row = await db('authentication').update({
                verify_token: newVerifyToken
            }).where('user_id', userID).returning('*');
            return (row.length > 0);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Authentication