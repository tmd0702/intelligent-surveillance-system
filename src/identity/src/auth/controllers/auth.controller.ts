import {Request, Response } from 'express';
import {UserDto} from "../../users/dtos/user.dto";
import {kafkaWrapper} from "../../kafka-wrapper";
import {EmailVerificationProducer} from "../../events/producers/email-verification-producer";
import {UserCreatedProducer} from "../../events/producers/user-created-producer";
import {UserStatus} from "@softzone/common";
const otpGenerator = require('otp-generator')
const {isPasswordValid} = require('@softzone/common');
const Authentication = require('../models/auth.model');
const {User} = require('../../users/models/user.model');
const config = require("config");
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy')
const twilio = require('twilio')(config.get('PRIVATE_INFORM.TWILIO.ACCOUNT_SID'), config.get('PRIVATE_INFORM.TWILIO.AUTH_TOKEN'))

const generateAccessToken = async (req: Request, res: Response) => {
    let userInfo = req.body.user_info;
    const { accessToken, refreshToken } = await Authentication.generateTokens(userInfo);
    userInfo["token"] = accessToken;
    const isTokenUpdated = await Authentication.updateRefreshToken(refreshToken, userInfo["id"]);
    if (isTokenUpdated) {
        res.status(200).json({"success": true, "message": "Generate tokens successfully.", "data": [userInfo]})
    } else {
        res.status(200).json({"success": false, "message": "DB: Update refresh token failed.", "data": []})
    }
}
const verifyAccount = async (req: Request, res: Response) => {
    let userId = req.body.user_id;
    let otp = req.body.otp;
    try {
        const isOtpValid = await Authentication.verifyOTP(userId, otp);
        if (isOtpValid) {
            await Authentication.updateByUserID(userId, {otp: null});
            const updatedUser = await User.updateByID(userId, {status: UserStatus.WAITING_FOR_FACE_REGISTRATION})
            res.status(200).json({"success": true, "message": "Account verified. One more step!", "data": [updatedUser]})
        } else {
            res.status(200).json({"success": false, "message": "Invalid OTP. Please try again.", "data": []});

        }
    } catch (error) {
        res.status(500).json({"success": false, "message": "There was something wrong.", "data": []})
    }

}
const signIn = (req: Request, res: Response) => {
    const identifier = req.body.identifier;
    const password = req.body.password;
    Authentication.signIn(identifier, password).then(async (userInfo: UserDto) => {
        const { accessToken, refreshToken } = await Authentication.generateTokens(userInfo);
        userInfo["token"] = accessToken;
        const isTokenUpdated = await Authentication.updateRefreshToken(refreshToken, userInfo["id"]);
        if (isTokenUpdated) {
            res.status(200).json({"success": true, "message": "Signed in successfully.", "data": userInfo});
        } else {
            throw new Error("DB: Update refresh token failed");
            res.status(500).json({"success": false, "message": "Something went wrong.", "data": userInfo})
        }

    }).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message, "data": []});
    });
}
const signUp = (req: Request, res: Response) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const phoneNumber = req.body.phone_number;
    const dob = req.body.dob;
    const password = req.body.password
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    Authentication.signUp(firstName, lastName, email, phoneNumber, dob, password).then( async (userInfo: UserDto) => {
        await new UserCreatedProducer(kafkaWrapper.producer).produce({
            id: userInfo.id,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            phone_number: userInfo.phone_number,
            email: userInfo.email,
        });
        await new EmailVerificationProducer(kafkaWrapper.producer).produce({
            userId: userInfo.id,
            fullName: userInfo.first_name + ' ' + userInfo.last_name,
            email: userInfo.email,
            otp: otp
        });

        res.status(200).json({"success": true, "message": "User created.", "data": userInfo});
    }).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message, "data": {}});
    });
}
const signOut = async (req: Request, res: Response) => {
    try {
        const isTokenUpdated = await Authentication.signOut(req.query.user_id);
        if (isTokenUpdated) {
            res.status(200).json({"success": true, "message": "Signed out successfully.", "data": []})
        } else {
            throw new Error("DB: Update refresh token failed");
        }
    } catch(err: any) {
        res.status(500).json({ error: true, message: "Internal Server Error: " + err.message });
    }
}
const generateVerifyUserToken = (data: any) => {
    const payload = {_data: data, _current: new Date()};
    const accessToken = jwt.sign(
        payload,
        config.get("JWT.ACCESS_TOKEN.PRIVATE_KEY"),
        {expiresIn: config.get("JWT.ACCESS_TOKEN.VERIFY_OTP_EXPIRES_IN")}
    );
    return Promise.resolve(accessToken);
}
const manualVerifyToken = async (req: Request, res: Response) => {
    const token = req.body.token;

    if (!token) {
        res.status(200).json({"success": false, "message": "Verify failed.", "data": []});
    }
    try {
        const decoded = jwt.verify(token, config.get('JWT.ACCESS_TOKEN.PRIVATE_KEY'));
        let userID = (await Authentication.findUserByVerifyToken(token));
        if (userID != null) {
            userID = userID.user_id;
            res.status(200).json({"success": true, "message": "Verify successfully.", "data": [{id: userID}]});
        } else {
            res.status(200).json({"success": false, "message": "Verify failed.", "data": []});
        }
    } catch (err) {
        res.status(200).json({"success": false, "message": "Verify failed.", "data": []});
    }
}

const reGenerateAccessToken = async (req: Request, res: Response) => {

    const refreshToken = (await Authentication.findTokenByuserID(req.body.user_id)).refresh_token;
    Authentication.verifyRefreshToken(refreshToken)
        .then(({ tokenDetails }: any) => {
            const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
            const accessToken = jwt.sign(
                payload,
                config.get("JWT.ACCESS_TOKEN.PRIVATE_KEY"),
                { expiresIn: config.get("JWT.ACCESS_TOKEN.EXPIRES_IN") }
            );
            res.status(200).json({
                success: true,
                data: [{
                    token: accessToken
                }],
                message: "Access token created successfully",
            });
        })
        .catch((err: Error) =>
            res.status(401).json({
                success: false,
                data: [],
                message: err
            })
        );
}

const sendSMSOtp = (req: Request, res: Response)=>{
    const { phoneNumber } = req.body;

    // Tạo secret và mã OTP
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    console.log('secret', secret)
    const token = speakeasy.totp({
        secret: secret, // nên lưu vào database hoặc backend
        encoding: 'base32',
        step: 60,
    });

    console.log('Generated Token:', token);

    twilio.messages
        .create({
            body: `Your OTP code is: ${token}`,
            to: phoneNumber,
            from: config.get('PRIVATE_INFORM.PHONE'),
        })
        .then((message: any) => res.status(200).json({ success: true, secret, token, 'message.sid': message.sid }))
        .catch((error: Error) => {
            console.error('Error sending OTP:', error);
            res.status(500).json({ success: false, error: error.message });
        });
}
const checkPhoneNumber = (req: Request, res: Response)=>{
    try{
        twilio.lookups.v2.phoneNumbers(req.body.phoneNumber)
            .fetch()
            .then((phone_number: any) => {
                if(phone_number.valid === true){
                    res.status(200).json({ success: true, valid: true })
                }else{
                    res.status(200).json({ success: true, valid: false })
                }
            })
            .catch((error: Error) => {
                console.error('Phone Number Error:', error);
                res.status(500).json({ success: false, error: error.message });
            });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const verifiedOtp = (req: Request, res: Response)=>{
    const { secret, token } = req.body;
    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        step: 60
    });

    if (verified) {
        console.log('Verified');
        res.status(200).json({success: true, message: 'OTP is valid'});
    } else {
        console.log('Not Verified');
        res.status(200).json({success: false, message: 'OTP is invalid'});
    }
}
module.exports = {
    signIn,
    signOut,
    signUp,
    reGenerateAccessToken,
    sendSMSOtp,
    verifiedOtp,
    generateAccessToken,
    manualVerifyToken,
    generateVerifyUserToken,
    checkPhoneNumber,
    verifyAccount
}