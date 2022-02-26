const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(email) {
             return  /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z]{2,6})$/.test(email);
            },
            message: "invalid email, please fill put a valid email."
        },
      },
      thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
      friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
      toJSON: {
          getters: true,
        virtuals: true,
      },
    }
);
  
userSchema
userSchema
  .virtual("friendcount")
  .get(function () {
    return this.friends.length;
});

const User = model('User', userSchema); 
 
module.exports = User;