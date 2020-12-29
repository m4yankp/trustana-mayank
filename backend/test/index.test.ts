import {expect} from 'chai';
import app from '../app';
import * as fs from 'fs';


import {agent as request} from 'supertest';

describe("Index Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });
});
// Valid Data Without File
const validData = {'firstName': 'Mayank',
                'secret': '123123',
                'lastName': 'Kushwaha',
                'dateOfBirth': '15/01/1990',
                'address': 'Regent Residences',
                'username': 'm4yank123123',
                'password': 'Password'};

// Valid Data With File
const validDataWithFile = {'firstName': 'Mayank',
                'secret': '123123',
                'lastName': 'Kushwaha',
                'dateOfBirth': '15/01/1990',
                'address': 'Regent Residences',
                'username': 'm4yank2020',
                'password': 'Password',
                'filePath': fs.readFileSync(`${__dirname}/test.pdf`)};
describe("Routes Test", () => {
   
    it('should POST /api/user without file', async function () {
        const res = await request(app)
            .post('/api/user').send(validData);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.true;
        expect(res.body.message).to.be.equal("Please provide all valid fields");
    });
    it('should POST /api/user with file', async function () {
        const res = await request(app)
            .post('/api/user').send(validDataWithFile);
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
    });
})