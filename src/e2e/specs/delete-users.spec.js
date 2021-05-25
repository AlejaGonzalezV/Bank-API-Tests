const axios = require('axios');
const { expect, assert } = require('chai');
const chai = require('chai');

const url = "https://bank-users-back.herokuapp.com/users";
const user = {
    "document":121212,
    "name": "Carlos Limon",
    "username": "carlitos123",
    "active": true
}

describe("Given a created user", () =>{
    before(async ()=>{
        userCreated = await axios.post(url,user);
        
    });

    describe("When user deletes an existing user", () =>{
        before(async () =>{
            oldUsers = await axios.get(url);
            response = await axios.delete(`${url}/${user.document}`);
            newUsers = await axios.get(url);
        });

        it("Should return OK satus code", () =>{
            expect(response.status).eql(204);
        })

        it("The user deleted should not exist on the users list", () =>{
            expect(oldUsers.data).not.contain(userCreated.data);
        })

        it("The users list length should decrease by 1", () =>{
            expect(newUsers.data.length).eql(oldUsers.data.length-1);
        })

    })
})

describe("When user wants to delete a user with an incorrect id", () =>{

    it('Then should return a 404 status error', (done) => {
        axios.delete(`${url}/0`).catch(function (error) {
            const status = error.response.status;
            expect(status).eql(404);
        done()
      });
    });
    
    
});