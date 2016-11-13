import chai from 'chai'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
const should =  chai.should();
import Event from '../../src/api/event/model/Event'
const endpointBase = '/api/events'
import server from  '../../server'

chai.use(chaiHttp);

describe('Events', () => {

    beforeEach((done) => {
        Event.remove({}, (err) => {
            done();
        });
    });

    describe('/GET events', () => {
        it('it should GET all the events', (done) => {
            chai.request(server)
                .get(endpointBase)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST events', () => {

        it ('it should create a new event', (done) => {

          const event = {
              event_name : 'test event',
              description: "Et kurs for alle som er interessert i Node utvikling",
              image : "data:image/jpeg;base64,/9j/4QUmRXhpZgAASUkqABAAAAAAAAAAAAAAAAIADgE",
              capacity : 32,
              event_date : "Mon Nov 14 2016 17:00:00 GMT+0100",
              participation_deadline: "Sun Nov 13 2016 14:13:47 GMT+0100",
              event_status: "active",
              event_type: "workshop",
              event_location: "MELKEVEIEN, BG14",
              hosts:  ["Jørgen Brække", "Sean Scully"]
          }

          chai.request(server)
              .post(endpointBase)
              .set('content-type', 'application/x-www-form-urlencoded')
              .send(event)
              .end( (err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  Object.keys(event).forEach( (key) => {
                      res.body.should.have.property(key);
                  });
                  done();
              })
        })
    });

});
