import chai from 'chai'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Profile from '../../src/api/profile/model/Profile';
import User from '../../src/api/user/model/User';
import server from  '../../server';
const should =  chai.should();

mongoose.Promise = Promise;

chai.use(chaiHttp);

const mockUser = {
    email : "jorgen.braekke@soprasteria.com",
    pw : "jarjarBing1"
};

const mockUser2 = {
    email : "jorgen.braekke@jabadahut.com",
    pw : "jarjarBing1"
};

describe('User', () => {

    describe('/POST user', () => {
        it('it should POST/CREATE a unvalidated user', (done) => {
            chai.request(server)
                .post('/api/user')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(mockUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message");
                    done();
                });
        });
    });

    describe('/POST user', () => {
        it('it should fail due to mail address', (done) => {
            chai.request(server)
                .post('/api/user')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(mockUser2)
                .end((err, res) => {
                    res.should.have.status(423);
                    done();
                });
        });
    });

    //REMOVES USER AND PROFILE
    afterEach(function(done) {
        User.findOne({email: mockUser.email}, (err, user) => {
            if(user){
                user.remove((err, doc) => {
                    if(!err){
                        Profile.findOne({email: mockUser.email}, (err, profile) => {
                            if(profile){
                                profile.remove((err, profile) => {
                                    done()
                                })
                            }
                            else
                                done()
                        })
                    }
                    else{
                        done()
                    }
                });
            }
            else{
                done()
            }
        });
    });

});