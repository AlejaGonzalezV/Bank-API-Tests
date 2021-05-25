const axios = require('axios');
const { expect } = require('chai');

let response;

const url = 'https://bank-users-back.herokuapp.com/users';

describe("When the user wants to list users", () => {
    before(async() => {
        response = await axios.get(url);
    });

    it("Then it should return an OK status code",()=>{
        expect(response.status).eql(200);
    });

    it("Then it should return a list with at least one element and that user should have id, document, name, username and active", ()=>{
        
        user = response.data
        expect(user.length).to.be.greaterThan(0);
        user = response.data[0];
        expect(user).to.have.property("id");
        expect(user).to.have.property("document");
        expect(user).to.have.property("name");
        expect(user).to.have.property("username");
        expect(user).to.have.property("active");


    })
});