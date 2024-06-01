const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name:{
    type: String
  },
  address:{
    type: String
  },
  gender:{
    type: String
  },
  age:{
    type: Number
  },
  answers: [{
    type: Number,
    min: 0,
    max: 100
  },
],
stress_level:{
  type: String,
},
anxiety_level:{
  type: String,
},
depression_level:{
  type: String,
},
profile_picture:{
  type: String
},
role:{
  type:String
}
  // Additional fields can be added here as needed.
});

module.exports = mongoose.model('User', userSchema);
