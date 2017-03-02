import chai from 'chai'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Event from '../../src/api/event/model/Event';
import Location from '../../src/api/location/model/Location';

import server from  '../../server';

const endpointBase = '/api/events/';
const should =  chai.should();

mongoose.Promise = Promise;

// example of event
const mockedEvent = {
  event_name : 'test event',
  description: "Et kurs for alle som er interessert i Node-utvikling",
  image : "data:image/jpeg;base64,/9j/4QUmRXhpZgAASUkqABAAAAAAAAAAAAAAAAIADgE",
  capacity : 32,
  event_date : new Date(Date.now()+(1000*3600*24*7)),
  participation_deadline: new Date(Date.now()+(1000*3600*24*6)),
  event_status: "active",
  event_type: "workshop",
  event_location: "",
  duration_hours: 3,
  hosts:  []
};

const profile = {
  name : "Jørgen Hattemaker",
  email : "jorgen.hattemaker@soprasteria.com"
}

chai.use(chaiHttp);

describe('Events', () => {

  beforeEach((done) => {

    Location.findOne({name : "Melkeveien"}, (err, doc) => {
      mockedEvent.event_location = doc._id;
      mockedEvent.hosts.push(doc._id);
      Event.remove({}, (err) => {
        if (!err) return
      });
    }).then( () => {
      new Event(mockedEvent).save().then( (err, doc) => {
        done();
      })
    })


  });

  describe('/GET events', () => {
    it('should GET all the events', (done) => {
      chai.request(server)
      .get(endpointBase)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
    });
  });

  describe('/GET event by id', () => {
    it('should GET event by resource Id', (done) => {
      Event.findOne({event_name : "test event"}, (err, doc) => {
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


  describe('/POST events', () => {
    it('should create a new event', (done) => {
      chai.request(server)
      .post(endpointBase)
      .set('content-type', 'application/json')
      .send(mockedEvent)
      .end( (err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        Object.keys(mockedEvent).forEach( (key) => {
          res.body.should.have.property(key);
        });
        done();
      })
    })
  });

});
