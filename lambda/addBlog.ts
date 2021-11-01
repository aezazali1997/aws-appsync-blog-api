const AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
import { Blog } from "../models/blog.model";
export async function addBlog(blog: Blog) {
  const params = {
    TableName: process.env.BLOG,
    Item: blog,
  };
  try {
    await docClient.put(params).promise();
    return blog;
  } catch (error) {
    throw new Error(error);
    return null;
  }
}
