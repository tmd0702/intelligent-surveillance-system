const {Ports} = require("@softzone/common");
const {regisFaces} = require('./face-recog-client');
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
FACE_PATH = '/home/duc-softzone/intelligent-surveillance-system/src/face-recog/src/data/celeb_data/CelebA/Img/train/';

class MockupClient {
    constructor(identifier, password) {
        this.identifier = identifier;
        this.password = password;
        this.token = null;
        //this.signIn();
    }

    async signIn() {
        try {
            const response = await fetch(`http://localhost:${Ports.IDENTITY}/api/users/auth/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: this.identifier,
                    password: this.password
                })
            });

            if (!response.ok) {
                throw new Error('Failed to sign in');
            }

            const responseObj = await response.json();
            if (responseObj.success) {
                this.token = responseObj.data.token;
                console.log('Sign-in successful. Token acquired.');
            }
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    }

    async addItemCategory(data, token) {
        try {
            const response = await fetch(`http://localhost:${Ports.ITEMS}/api/items/categories/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    details: data,
                    token: token
                })
            });
            if (!response.ok) {
                throw new Error('Failed to create data');
            }

            const responseObj = await response.json();
            if (responseObj.success) {
                console.log(responseObj.message);
            }
        } catch (error) {
            console.error('Create data error:', error);
        }
    }
    async updateUser(id, data, token) {
        try {
            const response = await fetch(`http://localhost:${Ports.IDENTITY}/api/users/update/id`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    details: data,
                    token: token,
                    id: id
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const responseObj = await response.json();
            if (responseObj.success) {
                console.log(responseObj.message + " " + id);
            }
        } catch (error) {
            console.error('Update user error:', error);
        }
    }
    async updateEmployee(id, data, token) {
        try {
            const response = await fetch(`http://localhost:${Ports.EMPLOYEES}/api/employees/update/id`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    details: data,
                    token: token,
                    id: id
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update employee');
            }

            const responseObj = await response.json();
            if (responseObj.success) {
                console.log(responseObj.message + " " + id);
            }
        } catch (error) {
            console.error('Update employee error:', error);
        }
    }
    async empFaceMapping() {

        const isImageFile = (file) => {
            const imageExtensions = ['.jpg', '.jpeg', '.png'];
            return imageExtensions.includes(path.extname(file).toLowerCase());
        };

        const processFolder = (currentPath, empId, token) => {
            try {
                const filesAndFolders = fs.readdirSync(currentPath);
                filesAndFolders.forEach(async (item, index) => {
                    const itemPath = path.join(currentPath, item);
                    const stat = fs.statSync(itemPath);

                    if (isImageFile(item)) {
                        const folderName = path.basename(currentPath);
                        const imageBuffer = fs.readFileSync(itemPath);
                        const base64Image = imageBuffer.toString('base64');
                        const faceId = await regisFaces(base64Image);
                        if (index == 0) await this.updateEmployee(empId, {face_id: faceId}, token)
                    }
                });
            } catch (error) {
                console.log(empId, 'skip');
            }

        };
        const response = await fetch(`http://localhost:${Ports.EMPLOYEES}/api/employees/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        const responseObj = await response.json();
        if (responseObj.success) {
            const data = responseObj.data;
            for (let i=0; i < data.length; ++i) {
                await processFolder(path.join(FACE_PATH, (i + 6000).toString()), data[i].id, this.token);

            }

        }
    }
    async faceMapping() {

        const isImageFile = (file) => {
            const imageExtensions = ['.jpg', '.jpeg', '.png'];
            return imageExtensions.includes(path.extname(file).toLowerCase());
        };

        const processFolder = (currentPath, userId, token) => {
            try {
                const filesAndFolders = fs.readdirSync(currentPath);
                filesAndFolders.forEach(async (item, index) => {
                    const itemPath = path.join(currentPath, item);
                    const stat = fs.statSync(itemPath);

                    if (isImageFile(item)) {
                        const folderName = path.basename(currentPath);
                        const imageBuffer = fs.readFileSync(itemPath);
                        const base64Image = imageBuffer.toString('base64');
                        const faceId = await regisFaces(base64Image);
                        if (index == 0) await this.updateUser(userId, {face_id: faceId}, token)
                    }
                });
            } catch (error) {
                console.log(userId, 'skip');
            }

        };
        const response = await fetch(`http://localhost:${Ports.IDENTITY}/api/users/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        const responseObj = await response.json();
        if (responseObj.success) {
            const data = responseObj.data;
            for (let i=0; i < data.length; ++i) {
                await processFolder(path.join(FACE_PATH, (i + 3000).toString()), data[i].id, this.token);

            }

        }
    }
    async addItem(data, token) {
        try {
            const response = await fetch(`http://localhost:${Ports.ITEMS}/api/items/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    details: data,
                    token: token
                })
            });
            if (!response.ok) {
                throw new Error('Failed to create data');
            }

            const responseObj = await response.json();
            if (responseObj.success) {
                console.log(responseObj.message);
            }
        } catch (error) {
            console.error('Create data error:', error);
        }
    }
    async addDepartment(data, token) {
        try {
            const response = await fetch(`http://localhost:${Ports.DEPARTMENTS}/api/departments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    details: data,
                    token: token
                })
            });
            //console.log('status', response.status);
            if (!response.ok) {
                throw new Error('Failed to create data');
            }

            const responseObj = await response.json();
            if (responseObj.success) {
                console.log(responseObj.message);
            } else {
                console.log(responseObj.message);
            }
        } catch (error) {
            console.error('Create data error:', error);
        }
    }
    async addEmployee(data, token) {
        try {
            const response = await fetch(`http://localhost:${Ports.EMPLOYEES}/api/employees/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    details: data,
                    token: token
                })
            });
            //console.log('status', response.status);
            if (!response.ok) {
                throw new Error('Failed to create data');
            }

            const responseObj = await response.json();
            if (responseObj.success) {
                console.log(responseObj.message);
            } else {
                console.log(responseObj.message);
            }
        } catch (error) {
            console.error('Create data error:', error);
        }
    }
    async signUp(firstName, lastName, email, phoneNumber, dob, password) {
        try {
            const response = await fetch(`http://localhost:${Ports.IDENTITY}/api/users/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: phoneNumber,
                    dob: dob,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            const responseObj = await response.json();
            if (responseObj.success) {
                console.log(responseObj.message);
            }
        } catch (error) {
            console.error('Sign up error:', error);
        }
    }
    async request(host, endpoint, method = 'GET', body = null) {
        if (!this.token) {
            console.error('No token found. Please sign in first.');
            return;
        }

        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${host}${endpoint}`, options);
        return response.json();
    }
}
module.exports = {
    MockupClient
}

