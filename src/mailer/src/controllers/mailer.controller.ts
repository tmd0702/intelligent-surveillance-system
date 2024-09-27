import {mailer} from "../models/mailer.model";
import {AccountVerificationDetailDto} from "../dtos/account-verification-detail.dto";
import {EmailStatus} from '@softzone/common';
import {EmailSubject} from "../enums/subjects";
const config = require('config');
const fs = require('fs');
const retry = require('retry');

export const verifyAccount = async (accountVerificationDetail: AccountVerificationDetailDto): Promise<EmailStatus> => {
    const emailOTPForm = fs.readFileSync('src/assets/html/account-verification.html', 'utf8');
    let content = emailOTPForm.replaceAll('{{fullName}}', accountVerificationDetail.fullName).replaceAll('{{OTP}}', accountVerificationDetail.otp);
    let operation = retry.operation({
        maxRetryTime: config.get("RETRY.MAX_RETRY_TIME")
    })

    return new Promise((resolve, reject) => {
        operation.attempt(async () => {
            const status = await mailer.sendMail(accountVerificationDetail.email, EmailSubject.ACCOUNT_VERIFICATION, content);
            const err = !(status === 'success') ? true : null
            if (operation.retry(err)) {
                return
            }

            if (status === 'success') {
                resolve(EmailStatus.SUCCESS)
            } else {
                console.error(operation.mainError());
                reject(EmailStatus.FAIL);
            }
        })
    })
}

