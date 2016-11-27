import chai from 'chai'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Location from '../../src/api/location/model/Location';
import server from  '../../server';

const endpointBase = '/api/locations';
const should =  chai.should();

mongoose.Promise = Promise;

// example
const mockLocation = {
    name : 'Melkeveien',
    address: 'Biskop Gunnerus gate 14, 0155 Oslo',
    etg: 25,
    coordinates: [59.911713, 10.753995]
};

chai.use(chaiHttp);

describe('Locations', () => {

    beforeEach((done) => {
        Location.remove({}, (err) => {
            done();
        });
    });

    describe('/GET locations', () => {
        it('it should GET all locations', (done) => {
            chai.request(server)
                .get(endpointBase)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET location by id', () => {

        new Location(mockLocation).save( (err, doc) => {
            it('it should GET location by resource id', (done) => {
                chai.request(server)
                    .get(endpointBase + doc._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });


    describe('/POST locations', () => {

        it ('it should create a new location', (done) => {

            chai.request(server)
                .post(endpointBase)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(mockLocation)
                .end( (err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(mockLocation).forEach( (key) => {
                        res.body.should.have.property(key);
                    });
                    done();
                })
        })
    });

});
