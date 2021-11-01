import { customEvent } from "../models/event.model";

const AWS = require("aws-sdk");
const docCLient = new AWS.DynamoDB.DocumentClient();
export async function deleteBlog(blogID: String) {
  const params = {
    TableName: process.env.BLOG,
    Key: {
      id: blogID,
    },
  };
  console.log(params, blogID);
  try {
    await docCLient.delete(params).promise();
    return "succesfully deleted";
  } catch (error) {
    throw new Error(error);
    return null;
  }
}
