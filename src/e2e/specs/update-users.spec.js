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

describe("Given a created", () =>{
    before(async()=>{
        oldUser = await axios.post(url, user);
    });

    after(async ()=>{
        deleteResponse = await axios.delete(`${url}/${user.document}`);
        if(deleteResponse.status === 200){
            console.log("Data deleted successfully");
        }else{
            console.log("Error removing data");
        }
    })

    describe("When the user wants to edit a user without a field", () =>{

        it('Then should return a 500 status error', (done) => {
            axios.put(url+"/"+oldUser.data.document, baduser).catch(function (error) {
                const status = error.response.status;
                expect(status).eql(500);
            done()
          });
        });
        
        
    });

    describe("When the user wants to update the user", () =>{
        before(async()=>{
            user['name'] = `${user.name}-MOD`;
            user['username'] = `${user.author}-MOD`;
            oldList = await axios.get(url);
            response = await axios.put(url+"/"+user.document, user);
            newList = await axios.get(url);
        });
        
        it("Should return OK status", ()=>{
            expect(response.status).eql(200);
        });

        it("Should return the user modifyed", () =>{
            modUser = response.data;
            delete modUser['id'];
            expect(modUser).eql(user);
        });

        it("Should return a different user than the initial one", () =>{
            modUser = response.data;
            delete modUser['id'];
            expect(modUser).not.eql(oldUser.data);
        })

        it("Should return a list with the same size", () =>{
            expect(newList.data.length).eql(oldList.data.length);
        });

    });

});