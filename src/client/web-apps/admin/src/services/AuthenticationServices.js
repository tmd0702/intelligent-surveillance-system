import * as httpRequest from '../utils/request';

export const signIn = async (identifier, password) => {
    try {
        const res = await httpRequest.post('api/users/auth/sign-in', {
            identifier: identifier,
            password: password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const sendVerifyEmail = async (email) => {
    try {
        const res = await httpRequest.post('api/auth/recovery-password/send-verify-email', {
            email: email,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updatePassword = async (newPassword, oldPassword, userId) => {
    try {
        const res = await httpRequest.post(
            'api/auth/update-password',
            {
                new_password: newPassword,
                old_password: oldPassword,
                user_id: userId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                        }`,
                },
            },
        );
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            return await processRefreshToken(() => updatePassword(newPassword, oldPassword, userId));
             
        }
    }
};

export const resetPassword = async (password, token) => {
    try {
        const res = await httpRequest.post('api/auth/recovery-password/reset-password', {
            token: token,
            password: password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const OAuthSignIn = async (token) => {
    try {
        const res = await httpRequest.post('/api/auth/sign-in/oauth', {
            token: token,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const OAuthSignUp = async (username, id, token) => {
    try {
        const res = await httpRequest.post('/api/auth/sign-up/set-username', {
            username: username,
            id: id,
            token: token,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const signUp = async (firstName, lastName, email, password, username) => {
    try {
        const res = await httpRequest.post('api/auth/sign-up', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            username: username,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const manualVerifyToken = async (token) => {
    try {
        const res = await httpRequest.post('api/auth/verify-token/verify', {
            token: token,
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            console.log(error.response);
            return error.response;
        }
    }
};
export const verifyAccount = async (token) => {
    try {
        const res = await httpRequest.post('api/auth/verify-account/verify', {
            token: token,
        });
        return res;
    } catch (error) {
        console.log(error);
        if (error.status === 401 || (error?.response?.status === 401)) {
            console.log(error.response);
            return error.response;
        }
    }
};

export const sendVerifyAccountEmail = async (email) => {
    try {
        const res = await httpRequest.post('api/auth/verify-account/send-verify-email', {
            email: email,
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const signOut = async (userId) => {
    try {
        const res = await httpRequest.del('api/users/auth/sign-out', {
            params: {
                user_id: userId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).token : null
                    }`,
            },
        });
        localStorage.removeItem('admin_info');
        localStorage.removeItem('user_info');
        localStorage.removeItem('avatar_url');
        return res;
    } catch (error) {
        // console.log('signouterr: ', error);
    }
};

export const refreshToken = async (userId) => {
    try {
        const res = await httpRequest.post('api/users/auth/refresh-token', {
            user_id: userId,
        });
        return res;
    } catch (error) {
        if (error.status === 401 || (error.response && error.response.status === 401)) {
            return error.response;
        }
        console.log(error);
    }
};

export const generateToken = async (userInfo, token) => {
    try {
        const res = await httpRequest.post('api/auth/access-token', {
            user_info: userInfo,
            token: token,
        });
        return res;
    } catch (error) {
        console.log('createtokenerr: ', error);
    }
};

export const processRefreshToken = async (func) => {
    let userInfo = JSON.parse(localStorage.getItem('user_info'));
    // console.log('user', userInfo);
    if (userInfo) {
        const newTokenPromise = (await refreshToken(userInfo.id));
        // console.log('newTokenPromise', newTokenPromise);
        try {
            if (newTokenPromise?.success === true) {
                const newToken = newTokenPromise.data[0].token;
                userInfo.token = newToken;
                localStorage.setItem('user_info', JSON.stringify(userInfo));
                return func();
            } else {
                signOut(userInfo.id).then((result) => {
                    window.location.href = "#/users/login";
                })
                    .catch((err) => {
                        console.log(err);
                    });
            }

        } catch (err) {
            signOut(userInfo.id).then((result) => {
                window.location.href = "#/users/login";
                console.log(result);
            })
                .catch((err) => {
                    console.log(err);
                });
        }

    } else {
        window.location.href = "#/user/login";
    }
};

export const sendOtp = async (phoneNumber) => {
    try {
        const res = await httpRequest.post('api/auth/two-factor-authentication/send-sms', {
            phoneNumber: phoneNumber,
        })
        return res;
    } catch (error) {
        console.log('sendOtpError: ', error);
    }
}
export const checkPhoneNumber = async (phoneNumber) => {
    try {
        const res = await httpRequest.post('api/auth/two-factor-authentication/check-phone-number', {
            phoneNumber: phoneNumber,
        })
        return res;
    } catch (error) {
        console.log('Check Phone Number Error: ', error);
    }
}
export const verifyOtp = async (OTP, secret) => {
    try {
        const res = await httpRequest.post('api/auth/two-factor-authentication/verified', {
            secret: secret,
            token: OTP,
        })
        return res
    } catch (error) {
        console.log('Check OTP Error: ', error);
    }
}