// const otpmodel = require('../models/otp');

const otpverification = async (otptime) => {

    try {
      console.log('millisecond is ', otptime);
  
      const cDateTime = new Date();
      const diffValue = (otptime - cDateTime.getTime()) / 1000;
      const minutes = Math.abs(diffValue / 60);
  
      console.log(`expired ${minutes}`);
  
      if (minutes > 4) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  
  module.exports =   otpverification
  
  