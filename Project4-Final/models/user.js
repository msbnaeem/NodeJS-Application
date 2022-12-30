const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    email: {type: String, required: [true, 'email address is required'], 
                    unique: [true, 'this email address has been used'] },
    password: { type: String, required: [true, 'password is required'] },
}
);

// replace plaintext w/hashed passwrd b4 saving the document in db
userSchema.pre('save', function(next){
    // this refers to the user (current model document, saved one) who is calling this pre save function
    // arrow func can't be used with this
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
    .then(hash => {
        // paswrd replaced with the generated bcrypt (hash)
      user.password = hash;
      next();
    })
    .catch(err => next(error));
  });

  // compare login and hashed password
userSchema.methods.comparePassword = function(inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model('User', userSchema);