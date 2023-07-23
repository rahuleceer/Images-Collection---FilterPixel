const {
  S3Client,
  ListObjectsCommand,GetObjectCommand
} = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  signer: {
      sign: async (request) => request
  }
});

let val=[];

const run = async () => {
  try {
      const data = await s3Client.send(new ListObjectsCommand({Bucket: 'testbucketfp'}));
      //console.log("Success", data.Contents);
      val=[];
      for(let i=0; i<data.Contents.length; i++){
        val.push(data.Contents[i].Key);
      }
      //console.log("S3", val);
  } catch (err) {
      console.log("Error", err);
  }
};


module.exports = async (req, res) => {
    run();
    //console.log("--->", val);
    res.status(200).json({val});
};