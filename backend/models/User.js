const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password : {
    type: String,
    require: true,
  },
  admin:{
    type: Boolean,
    default:false,
  },
  score:Number,
},{
  timestamps: true
}
);

const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;