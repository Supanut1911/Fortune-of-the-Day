import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const REGION = "ap-southeast-1";
const accessKeyId = process.env.NEXT_PUBLIC_DYNAMODB_ACCESS_KEY_IDA;
const secretAccessKey = process.env.NEXT_PUBLIC_DYNAMODB_SECRET_ACCESS_KEY;
let ddbClient: DynamoDBClient;
if (accessKeyId === undefined || secretAccessKey === undefined) {
  throw new Error("Not found access key or secret key, pls check");
} else {
  ddbClient = new DynamoDBClient({
    region: REGION,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });
}

export { ddbClient };
