let chai = require('chai');
let chaiHttp = require("chai-http");
let server = require("../index");


chai.should();

chai.use(chaiHttp);

describe("Task User API", ()=>{

  describe("POST /api/user/reg" , ()=>{
    it("It should create a new user",(done)=>{

        const user = {
          name:"66666666",
          password:"demo1234"
        };

        chai.request(server)
          .post("/api/user/reg")
          .send(user)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code');
            res.body.should.have.property('data');
            res.body.code.should.be.eq(200);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('name');
            res.body.data.should.have.property('password');
            res.body.data.should.have.property('updatedAt');
            res.body.data.should.have.property('createdAt');
            res.body.data.name.should.eq(user.name);
            res.body.data.password.should.eq(user.password);
            done();
          });
    });

    it("It should not create a new user without the password property",(done)=>{

        const user = {
          name:"test2",
        };

        chai.request(server)
          .post("/api/user/reg")
          .send(user)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code');
            res.body.should.have.property('error');
            res.body.code.should.be.eq(400);
            res.body.error.should.eq("Name or password cannot be null or empty");
            done();
          });
    });

    it("It should not create a new user without the name property",(done)=>{

        const user = {
          password:"demo1234",
        };

        chai.request(server)
          .post("/api/user/reg")
          .send(user)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code');
            res.body.should.have.property('error');
            res.body.code.should.be.eq(400);
            res.body.error.should.eq("Name or password cannot be null or empty");
            done();
          });
    });

    it("It should not create a new user with name is not unique",(done)=>{

        const user = {
          name:"test",
          password:"demo1234",
        };

        chai.request(server)
          .post("/api/user/reg")
          .send(user)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code');
            res.body.should.have.property('error');
            res.body.code.should.be.eq(400);
            res.body.error.should.eq("Name is exsiting, please input other name");

            done();
          });
    });
  });


    describe("POST /api/user/login" , ()=>{
      it("It can login where username and password is correct",(done)=>{

          const user = {
            name:"jeff",
            password:"demo1234"
          };

          chai.request(server)
            .post("/api/user/login")
            .send(user)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('data');
              res.body.code.should.be.eq(200);
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('id');
              res.body.data.should.have.property('name');
              res.body.data.should.have.property('password');
              res.body.data.should.have.property('updatedAt');
              res.body.data.should.have.property('createdAt');
              res.body.data.name.should.eq(user.name);
              res.body.data.password.should.eq(user.password);
              done();
            });
      });

      it("It can't login where empty  name",(done)=>{

          const user = {
            password:"demo1234"
          };

          chai.request(server)
            .post("/api/user/login")
            .send(user)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.eq("Name or password cannot be null or empty");
              done();
            });
      });

      it("It can't login where empty username or password",(done)=>{

          const user = {
            name:"jeff"
          };

          chai.request(server)
            .post("/api/user/login")
            .send(user)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.eq("Name or password cannot be null or empty");
              done();
            });
      });

      it("It can't login where wrong username and password",(done)=>{

          const user = {
            name:"test21",
            password:"demo1234"
          };

          chai.request(server)
            .post("/api/user/login")
            .send(user)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.eq("Wrong name or password, please retry again");
              done();
            });
      });
    });
});
