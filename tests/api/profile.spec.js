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
         
         var profile = new Profile({
             email : "jorgen.braekke@soprasteria.com",
             describe : "",
             profile_img : ''
         });

         profile.save((err, doc) => {
             chai.request(server)
                .post('/api/user')
                .set('content-type', 'application/json')
                .send(mockUser)
                .end((err, res) => {
                    done();
                });
         })

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

    describe('/POST profile', () => {
        it('it should POST users profile', (done) => {
            const description = 'jeg er awesome'
            const profile_img = 'test'
            chai.request(server)
                .post(endpointBase)
                .set('content-type', 'application/json')
                .send({
                    description : description,
                    profile_img : profile_img
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.description.should.equal(description);
                    res.body.profile_img.should.equal(profile_img);
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
