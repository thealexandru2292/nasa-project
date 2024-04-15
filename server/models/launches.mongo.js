//we will define the schhema for launches model
const mongoose = require('mongoose');

const launchesSchema = new  mongoose.Schema({
    flightNumber: {
        type: Number,
        requried: true,
      /*   default: 100,
        min: 100,
        max: 999, */
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String, 
        requried: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    target: {                    //reffeences a planet in planets collections (like in SQL foreign-key) relational table, or look-up in SF
 /*      ype: mongoose.ObjectId, // this approach is more difficult, it doesn't support features of SQL that make this approach work, in SQL we have JOINS,
                                  //which makes easy to combine data from one table to other tables i.e for Planets, we need to create the logic ourselves in JS,
                                  //this won't be easy to do at all, databases are very spcialized pieces of software that have been perfected over decades
                                  // instead of adding all of this complexity with mongo we generally want to take a different approach
                                  // it is the NoSQL approach where we include relavant data of our planets directly in our lunch, directly in this target property
                                  //so no extra looku-up are required
                                  //all of the data we are interested in lives in this collection

        ref: 'Planet', */
        type: String, 
        required: true
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
    customers: [String],//array of strings
});