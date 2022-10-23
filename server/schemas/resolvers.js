const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getCurrent: async (parent, args, context) => {
      if (context.user){
          const userInfo = await User.findOne( { _id: context.user_id}).select(
              "-_v -password"
          );
          return userInfo
      }
      throw new AuthenticationError("Must log in first!");
  },
},

Mutation: {
  createUser : async(parent, args) => {
      const user = await User.create(args);
      return {token, user}
  },
  login: async( parent, { email, password }) => {
      const user = await User.findOne( { email });

      if (!user){
          throw new AuthenticationError("No account exists with this info")
      }

      const checkPw = await user.isCorrectPassword(password)

      if (!checkPw) {
          throw new AuthenticationError("Password does not match!")
      }

      const token = signToken(user)

      return { token, user}
  },
  deleteBook: async (parent, { bookId }, context) => {
      if (context.user){
          const removedBookUser = await User.findByIdAndUpdate(
              { _id: context.user_id },
              { $pull: { savedBooks: { bookId }}},
              { new: true }
          )
          return removedBookUser;
      }
      throw new AuthenticationError("You must be logged in first!")
  },
  addBook: async (parent, { bookToAdd }, context) => {
      if (context.user){
          const userToUpdate = await User.findByIdAndUpdate(
              { _id: context.user_id},
              { $push: { savedBooks: bookToAdd }},
              { new: true }
          )
          return userToUpdate;
      }
      throw new AuthenticationError("You must be logged in first!")
  }
}
}

module.exports = resolvers;