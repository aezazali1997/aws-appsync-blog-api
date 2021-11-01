const AWS = require("aws-sdk");
import { Blog } from "../models/blog.model";
const docClient = new AWS.DynamoDB.DocumentClient();
type Params = {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
};
export async function updateBlog(blogId: String, blog: any) {
  let params: Params = {
    TableName: process.env.BLOG,
    Key: {
      id: blogId,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW",
  };
  let prefix = "set";
  let attributes = Object.keys(blog);
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    if (attribute !== "id") {
      params["UpdateExpression"] +=
        prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = blog[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
  }
  try {
    await docClient.update(params).promise();
    return blog;
  } catch (error) {
    console.log("DynamoDb error", error);
    return null;
  }
}
