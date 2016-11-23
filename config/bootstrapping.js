import Counter from '../src/api/event/model/Counter';

//counter bootstrapping
Counter.count({}, (err, count) => {
    if(count === 0){
        const counter = new Counter({
            _id : "eventCounter"
        })
        counter.save();
    }
})