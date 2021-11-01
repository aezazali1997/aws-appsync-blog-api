const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
export async function getAllBlogs() {
  const params = {
    TableName: process.env.BLOG,
  };
  try {
    const data = await docClient.scan(params).promise();
    return data.Items;
  } catch (error) {
    throw new Error(error);
    return "failed to get any values";
  }
}
