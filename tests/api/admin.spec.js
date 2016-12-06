import chai from 'chai'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Profile from '../../src/api/profile/model/Profile';
import User from '../../src/api/user/model/User';
import server from  '../../server';

const endpointBase = '/api/admin/';
const should =  chai.should();

mongoose.Promise = Promise;

chai.use(chaiHttp);

const mockUser = {
    email : "jorgen.braekke@soprasteria.com",
    pw : "jarjarBing1",
    role : "member",
    activationHash : "cZAvBka-DxarVNV0pKv0n30KGjDy-mMaPnW7O.-2_1MMpIF4L0"
};

describe('Admin', () => {

    beforeEach((done) => {
        const user = new User(mockUser)
        user.save((err, user) => {
            done();
        })
    });

    describe('/POST admin/user/grant-admin-access', () => {
        it('it should UPDATE user\'s role to prefered role', (done) => {
            chai.request(server)
                .post('/api/admin/user/grant-admin-access')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    role : "admin",
                    email : mockUser.email
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/POST admin/user', () => {
        it('it should activate a user', (done) => {
            chai.request(server)
                .post('/api/admin/user')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    email : mockUser.email,
                    active : true
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    //REMOVES MOCK USER
    afterEach(function(done) {
        User.findOne({email: mockUser.email}, (err, user) => {
            if(user){
                user.remove((err, doc) => {
                    if(err){
                        done(err)
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
