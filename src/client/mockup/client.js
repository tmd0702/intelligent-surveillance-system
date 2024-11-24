const {Ports} = require("@softzone/common");

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

