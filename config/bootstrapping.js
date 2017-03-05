import User from '../src/api/user/model/User';
import Profile from '../src/api/profile/model/Profile';

import Counter from '../src/api/event/model/Counter';
import Event from '../src/api/event/model/Event';

import Location from '../src/api/location/model/Location';


//counter bootstrapping
User.count({}, (err, count) => {
    if(count === 0){
        User.create({
            email : 'test@soprasteria.com',
            pw : '$2a$08$fCFCF9mjMD3sHj8SaUd4I.W2Mjo1sGTYtHq4exJe7rrSFBUZ7VuWS',
            role : 'member',
            activationHash : "MNCU.0Y0AZ.RxX8izL0CvE~dx7ZAp_eCrab_eV0v~cV~lqJO1l",          
        },
        {
            email : 'sean.scully-admin@soprasteria.com',
            pw : '$2a$08$fCFCF9mjMD3sHj8SaUd4I.W2Mjo1sGTYtHq4exJe7rrSFBUZ7VuWS',
            role : 'member',
            activationHash : "MNCU.0Y0AZ.RxX8izL0CvE~dx7ZAp_eCrab_eV0v~cV~lqJO1l",          
        }
        )
    }
});

Location.count({}, (err, count) => {
    if(count === 0){
        Location.create({
            name : "MELKEVEIEN",
            address : "Biskop Gunnerus' gate 14A",
            etg : "25",
            coordinates: [
                59.911713,
                10.753995
            ]
        }, {
            name : "KARLSVOGNA",
            address : "Biskop Gunnerus' gate 14A",
            etg : "25",
            coordinates: [
                59.911713,
                10.753995
            ]
        }, (err) => {
            Profile.count({}, (err, count) => {
                if(count == 0){
                    //create profiles
                    Profile.create({
                        email : 'test@soprasteria.com',
                        name : 'Test Testesen'          
                    },
                    {
                        email : 'sean.scully-admin@soprasteria.com',
                        name : 'Sean Scully',          
                    }, (err) => {
                        if(!err){
                            //find finding locations|
                            Location.findOne({name : "MELKEVEIEN"}, (err, location) => {
                                Event.count({}, (err, count) => {
                                    if(count === 0){
                                        Profile.find({$or:[ {email: 'sean.scully-admin@soprasteria.com'}, {email: 'test@soprasteria.com'}]}, (err, profiles) =>{
                                            if(err)
                                                next(err)
                                            if(profiles.length === 2){
                                                //create events
                                                Event.create({
                                                    event_name : "The Node Project: Del 3",
                                                    description : "Et kurs for deg som har lyst til å lære mer om node",
                                                    capacity : "30",
                                                    event_date : new Date(Date.now()+(1000*3600*24*7)),
                                                    participation_deadline : new Date(Date.now()+(1000*3600*24*6)),
                                                    event_status : "active",
                                                    event_type : "workshop",
                                                    event_location : location._id,
                                                    hosts : [profiles[0]._id, profiles[1]._id]
                                                })
                                            }
                                        });
                                    }
                                }) //events add
                            })
                        }
                    })
                }
            }); //profile

        })
    }
});


//counter bootstrapping
Counter.count({}, (err, count) => {
    if(count === 0){
        const counter = new Counter({
            _id : "eventCounter"
        })
        counter.save();
    }
})