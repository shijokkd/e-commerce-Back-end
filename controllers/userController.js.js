
const otpmodel = require('../models/otp');
const otpverifications = require('../helpers/otpvalidate');
const otpgenerator = require('otp-generator');
// const twilio = require('twilio');
const bcrypt = require('bcrypt');
require('dotenv').config()
const nodemailer = require('nodemailer');

const OTPsend = require('../helpers/twilio')