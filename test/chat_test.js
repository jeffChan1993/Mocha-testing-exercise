let chai = require('chai');
let chaiHttp = require("chai-http");
let server = require("../index");


chai.should();

chai.use(chaiHttp);

describe("Task Chat API", ()=>{

  describe("GET /api/chat/:id" , ()=>{
    it("It should get all chat historys by user id",(done)=>{

        const user_id = 1;

        chai.request(server)
          .get("/api/chat/"+user_id)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code');
            res.body.should.have.property('data');
            res.body.code.should.be.eq(200);
            res.body.data.should.be.a('array');
            done();
          });
    });

    it("It should not get any chat historys without the user id is not existed",(done)=>{

        const user_id = 99999;
        chai.request(server)
          .get("/api/chat/"+user_id)
          .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code');
            res.body.should.have.property('error');
            res.body.code.should.be.eq(400);
            res.body.error.should.be.eq('User is not exsited');
            done();
          });
    });
  });


    describe("POST /api/chat/send" , ()=>{
      it("It can chat it when sender and receiver are existed",(done)=>{

          const chat = {
            sender_id:1,
            receiver_id:2,
            content:"hi"
          };

          chai.request(server)
            .post("/api/chat/send")
            .send(chat)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('data');
              res.body.code.should.be.eq(200);
              res.body.data.should.be.a('object');
              res.body.data.should.be.property('id');
              res.body.data.should.be.property('sender_id');
              res.body.data.should.be.property('receiver_id');
              res.body.data.should.be.property('content');
              res.body.data.should.be.property('updatedAt');
              res.body.data.should.be.property('createdAt');
              done();
            });
      });

      it("It cannot chat it when receiver_id property is not existed",(done)=>{

        const chat = {
          sender_id:1,
          content:"hi"
        };

          chai.request(server)
            .post("/api/chat/send")
            .send(chat)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.be.eq('Sender or receiver id cannot be null or empty');
              done();
            });
      });


      it("It cannot chat it when sender_id property is not existed",(done)=>{

        const chat = {
          receiver_id:1,
          content:"hi"
        };

          chai.request(server)
            .post("/api/chat/send")
            .send(chat)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.be.eq('Sender or receiver id cannot be null or empty');
              done();
            });
      });

      it("It cannot chat it when cotent property is not existed",(done)=>{

        const chat = {
          sender_id:1,
          receiver_id:3
        };

          chai.request(server)
            .post("/api/chat/send")
            .send(chat)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.be.eq('Content cannot be null or empty');
              done();
            });
      });


      it("It cannot chat it when sender (User) is not existed",(done)=>{

        const chat = {
          sender_id:99999999,
          receiver_id:1,
          content:'hi',
        };

          chai.request(server)
            .post("/api/chat/send")
            .send(chat)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.be.eq('Sender is not exsited');
              done();
            });
      });


      it("It cannot chat it when receiver (User) is not existed",(done)=>{

        const chat = {
          sender_id:1,
          receiver_id:9999999,
          content:'hi',
        };

          chai.request(server)
            .post("/api/chat/send")
            .send(chat)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.be.eq('Receiver is not exsited');
              done();
            });
      });


      it("It cannot chat it when receiver and sender is equal",(done)=>{

        const chat = {
          sender_id:1,
          receiver_id:1,
          content:'hi',
        };

          chai.request(server)
            .post("/api/chat/send")
            .send(chat)
            .end((err,res)=>{
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('code');
              res.body.should.have.property('error');
              res.body.code.should.be.eq(400);
              res.body.error.should.be.eq('Sender and receiver id cannot equal');
              done();
            });
      });


    });

});
