import {Consumer, EmailStatus, EmailVerificationCompleteEvent, Topics, UserStatus} from '@softzone/common';
import {UserUpdatedProducer} from "../producers/user-updated-producer";
import {kafkaWrapper} from "../../kafka-wrapper";
const User = require('../../users/models/user.model');
const Authentication = require('../../auth/models/auth.model');
export class VerificationCompleteConsumer extends Consumer<EmailVerificationCompleteEvent> {
    topic: Topics.EmailVerificationCompleted = Topics.EmailVerificationCompleted;

    async onMessage(data: EmailVerificationCompleteEvent['data']) {
        console.log(data);
        if (data.status == EmailStatus.SUCCESS) {
            const isValidOTP = await Authentication.verifyOTP(data.userId, data.otp);
            if (isValidOTP) {
                const updatedUser = await User.updateByUserID(data.userId, {
                    status: UserStatus.ACTIVE
                });
                new UserUpdatedProducer(kafkaWrapper.producer).produce({
                    id: updatedUser.id,
                    status: updatedUser.status
                })
            }
        }
        if (data.status == EmailStatus.FAIL) {
            console.error('Something went wrong');
        }
    }
}
