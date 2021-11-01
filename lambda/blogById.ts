const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
export async function getById(blogId: String) {
  const params = {
    TableName: process.env.BLOG,
    Key: {
      id: blogId,
    },
  };
  try {
    const { Item } = await docClient.get(params).promise();
    return Item;
  } catch (error) {
    throw new Error(error);
    return null;
  }
}
