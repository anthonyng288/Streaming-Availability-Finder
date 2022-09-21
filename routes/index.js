require('dotenv').config();

let AWS = require('aws-sdk');

var express = require('express');
var router = express.Router();

const bucketName = 'anthonycountertest'
const s3 = new AWS.S3({ apiVersion: "2006-03-01"});
const params = {Bucket: bucketName, Key: "Count"};

(async () => {
  try {
      await s3.createBucket({ Bucket: bucketName }).promise();
      console.log(`Created bucket: ${bucketName}`);
      
      try {
          //Checking to see if counter already exists in S3
          const s3Result = await s3.getObject(params).promise();
      } catch (err) {
          // If the counter did not exist initialise it
          try{
              const data = "0";
              const obj = {Bucket: bucketName, Key: "Count", Body:data};
              await s3.putObject(obj).promise();
          } catch (err) { console.log(err); } 
      } 
  } catch (err) {
  // We will ignore 409 errors which indicate that the bucket already exists
      console.log(`Error With AWS: ${err}`);
  }
})();

async function writeToS3(data)
{
    try{
        const newCount = parseInt(data) + 1;
        const obj = {Bucket: bucketName, Key: "Count", Body:newCount.toString()};
        await s3.putObject(obj).promise();
    }catch (err) {
        console.log(err);
        throw{title: "Error Writing To S3", err:err};
    }
}
// Function that gets the S3 bucket data
async function getCount(){
    try{
        const s3Result = await s3.getObject(params).promise();
        return s3Result.Body.toString('utf-8');
    }catch (err) {
        throw{title: "Error Reading From S3", err:err};
    }
}

/* GET home page. */
router.get('/', async function(req, res) {
  var count = await getCount();
  await writeToS3(count)
  res.render('index', { title: 'Stream Finder', count: count });

  //Add buttons


});

module.exports = router;
