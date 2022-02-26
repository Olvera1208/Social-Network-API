const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Schema.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 280,
      default: 'Unnamed assignment',
    },
    username: {
      type: string,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  
const thoughtsSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
          type: String,
          required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
         virtual: true,
        getters: true,
      },
    }
  );
  
  thoughtsSchema
  .virtual('reactionCount')
  .get(function () {
      if (this.reactions) {
          return this.reactions.length;
  } 
  })
  
  const Thought = model("thoughts", thoughtsSchema);
  
  module.exports = Thought;