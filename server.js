require('dotenv').config()

const express = require('express')

const app = express();

const PORT = print.env.PORT || 3000;

const connectToDB = require('./database/db.js')

// connect to our Database 
connectToDB();