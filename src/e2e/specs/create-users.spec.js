const axios = require('axios');
const { expect } = require('chai');

const url = "https://bank-users-back.herokuapp.com/users";
const user = {
    "document":121212,
    "name": "Carlos Limon",
    "username": "carlitos123",
    "active": true
}

const baduser = {
    "name": "Carlos Perez"
}

describe ("When the user wants to create a user", () =>{

    before(async() => {
        oldList = await axios.get(url);
        response = await axios.post(url, user);
        newList = await axios.get(url);
    });

    after(async ()=>{

        deleteResponse = await axios.delete(`${url}/${user.document}`);
        if(deleteResponse.status === 204){
            console.log("Data deleted successfully");
        }else{
            console.log("Error removing data");
        }
    });

    it("Then it should return an OK status code",()=>{
        expect(response.status).eql(201);
    });

    it("Then it should return the created user",()=>{
        createdUser = response.data;
        delete createdUser['id'];
        expect(createdUser).eql(user);
    });  

    it("Then it should return a JSON as content type",()=>{
       expect(response.headers['content-type']).to.contain('application/json');
    });

    it("Then it should return a list with the length increased by 1 element", ()=>{
        expect(newList.data.length).eql(oldList.data.length + 1);
    })
});

describe("When the user wants to create a user without a field", () =>{

    it('Then should return a 500 status error', (done) => {
        axios.post(url, baduser).catch(function (error) {
            const status = error.response.status;
            expect(status).eql(500);
        done()
      });
    });

});
