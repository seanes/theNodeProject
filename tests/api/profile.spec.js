import chai from 'chai'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Profile from '../../src/api/profile/model/Profile';
import User from '../../src/api/user/model/User';
import server from  '../../server';

const endpointBase = '/api/me';
const should =  chai.should();

mongoose.Promise = Promise;

chai.use(chaiHttp);

const mockUser = {
    email : "jorgen.braekke@soprasteria.com",
    pw : "jarjarBing1"
};

describe('Profile', () => {

    beforeEach((done) => {
         chai.request(server)
            .post('/api/user')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(mockUser)
            .end((err, res) => {
                done();
            });
    });

    describe('/GET profile', () => {
        it('it should GET users profile', (done) => {
            chai.request(server)
                .get(endpointBase)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
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
