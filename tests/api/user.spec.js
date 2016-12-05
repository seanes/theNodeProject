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

describe('Profile', () => {

    /*beforeEach((done) => {
        done();
    });*/

    describe('/GET events', () => {
        it('it should GET users profile', (done) => {
            chai.request(server)
                .get(endpointBase)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
