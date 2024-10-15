import {SMSSender} from "../models/sms.model";
import {AccountVerificationDetailDto} from "../dtos/account-verification-detail.dto";
import {SMSStatus} from "@softzone/common";

const config = require('config');
const fs = require('fs');
const retry = require('retry');

export const verifyAccount = async (accountVerificationDetail: AccountVerificationDetailDto): Promise<SMSStatus> => {
    let content = `Your OTP code for account verification at Mall: ${accountVerificationDetail.otp}`
    let operation = retry.operation({
        maxRetryTime: config.get("RETRY.MAX_RETRY_TIME")
    })

    return new Promise((resolve, reject) => {
        operation.attempt(async () => {
            const status = await SMSSender.send(accountVerificationDetail.phoneNumber, content);
            const err = !(status === SMSStatus.SUCCESS) ? true : null
            if (operation.retry(err)) {
                return
            }

            if (status === SMSStatus.SUCCESS) {
                resolve(SMSStatus.SUCCESS)
            } else {
                console.error(operation.mainError());
                reject(SMSStatus.FAIL);
            }
        })
    })
}

