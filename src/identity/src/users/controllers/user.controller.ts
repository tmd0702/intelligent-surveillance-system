import { Request, Response } from 'express';
const {User} = require("../models/user.model");
const Authentication = require("../../auth/models/auth.model");
import {UserDto} from "../dtos/user.dto";
import {extractFaces} from "../../face-recog-client";
const otpGenerator = require('otp-generator')
import {UserCreatedProducer} from "../../events/producers/user-created-producer";
import {kafkaWrapper} from "../../kafka-wrapper";
import {UserStatus} from "@softzone/common";
import {UserUpdatedProducer} from "../../events/producers/user-updated-producer";

const getUserById = (req: Request, res: Response) => {
    User.findByID(req.query.id).then((rows: UserDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getUserByEmail = (req: Request, res: Response) => {
    User.findByEmail(req.query.email).then((rows: UserDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    })
}
const count = (req: Request, res: Response) => {
    User.count().then((count: any) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": count})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const getUsers = (req: Request, res: Response) => {
    User.get().then((rows: UserDto[]) =>
        res.status(200).json({"success": true, "message": "Data successfully queried from the database.", "data": rows})
    ).catch((error: Error) => {
        res.status(200).json({"success": false, "message": error.message || "Unknown error occurred", "data": []})
    });
}
const addFace = async (req: Request, res: Response) => {
    const faces = await extractFaces(req.body.b64_data, true);
    if (faces.length > 0) {
        const faceId = faces[0].face_id;
        User.updateByID(req.body.id, {byte_data: Buffer.from(faces[0].cropped_image, 'base64'), face_id: faceId}).then(async (updated: UserDto) => {
            await new UserUpdatedProducer(kafkaWrapper.producer).produce({
                id: updated.id,
                first_name: updated.first_name,
                last_name: updated.last_name,
                phone_number: updated.phone_number,
                email: updated.email,
                face_id: updated.face_id
            });
            res.status(200).json({"success": true, "message": "Data successfully added to the database.", "data": [updated]})
        }).catch((err: Error) => {
            res.status(200).json({ "success": false, "message": "Update error", "data": [] });
        })

    } else {
        res.status(200).json({"success": false, "message": "Face not recognized. Please retry!", "data": []})
    }

}
const updateUserByID = (req: Request, res: Response) => {
    User.updateByID(req.body.id, req.body.details).then(async (updatedAccount: UserDto) => {
        await new UserUpdatedProducer(kafkaWrapper.producer).produce({
            id: updatedAccount.id,
            first_name: updatedAccount.first_name,
            last_name: updatedAccount.last_name,
            phone_number: updatedAccount.phone_number,
            email: updatedAccount.email,
            face_id: updatedAccount.face_id
        });
        res.status(200).json({ "success": true, "message": "Data updated!", "data": [updatedAccount] })
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
const generateRandomPassword = (length: number = 12, options?: {
    includeUppercase?: boolean,
    includeNumbers?: boolean,
    includeSymbols?: boolean
}): string => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterSet = lowercaseChars;

    if (options?.includeUppercase) {
        characterSet += uppercaseChars;
    }
    if (options?.includeNumbers) {
        characterSet += numberChars;
    }
    if (options?.includeSymbols) {
        characterSet += symbolChars;
    }

    if (!characterSet) {
        throw new Error('Character set is empty. Please enable at least one character type.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }

    return password;
};
const createUser = (req: Request, res: Response) => {
    const password = generateRandomPassword(12, {
        includeUppercase: true,
        includeNumbers: true,
        includeSymbols: true
    });
    const created = req.body.details;
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    Authentication.signUp(created.first_name, created.last_name, created.email, created.phone_number, created.dob, password).then( async (userInfo: UserDto) => {
        console.log('here')
        await new UserCreatedProducer(kafkaWrapper.producer).produce({
            id: userInfo.id,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            phone_number: userInfo.phone_number,
            email: userInfo.email,
        });
        // await new EmailVerificationProducer(kafkaWrapper.producer).produce({
        //     userId: userInfo.id,
        //     fullName: userInfo.first_name + ' ' + userInfo.last_name,
        //     email: userInfo.email,
        //     otp: otp
        // });
        // await new SMSVerificationProducer(kafkaWrapper.producer).produce({
        //     userId: userInfo.id,
        //     fullName: userInfo.first_name + ' ' + userInfo.last_name,
        //     phoneNumber: userInfo.phone_number,
        //     otp: otp
        // });
        console.log('here2')
        res.status(200).json({"success": true, "message": "User created!", "data": [userInfo]})
    }).catch((error: Error) => {
        res.status(200).json({ "success": false, "message": error.message || "Unknown error occurred", "data": [] })
    })
}
module.exports = {
    getUserById,
    getUsers,
    updateUserByID,
    getUserByEmail,
    createUser,
    addFace,
    count
}