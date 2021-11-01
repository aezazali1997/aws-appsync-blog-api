import * as cdk from '@aws-cdk/core';
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as ddb from "@aws-cdk/aws-dynamodb";
export class AwsAppsyncDynamoDbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const api = new appsync.GraphqlApi(this, "api", {
      name: "cdk-graphql-api",
      schema: appsync.Schema.fromAsset("graphql/schema.gql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
    });
    const lambdaFunc = new lambda.Function(this, "awsLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "blog.handler",
      memorySize: 1024,
    });
    const lambDS = api.addLambdaDataSource("awsLambdaDataSource", lambdaFunc);
    lambDS.createResolver({
      typeName: "Query",
      fieldName: "UI__getBlog",
    });
    lambDS.createResolver({
      typeName: "Query",
      fieldName: "UI__getAllBlogs",
    });
    lambDS.createResolver({
      typeName: "Mutation",
      fieldName: "addBlog",
    });
    lambDS.createResolver({
      typeName: "Mutation",
      fieldName: "updateBlog",
    });
    lambDS.createResolver({
      typeName: "Mutation",
      fieldName: "deleteBlog",
    });
    const blogTable = new ddb.Table(this, "cdkBlogTable", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });
    blogTable.grantFullAccess(lambdaFunc);
    lambdaFunc.addEnvironment("BLOG", blogTable.tableName);
    new cdk.CfnOutput(this, "graphql-URL", {
      value: api.graphqlUrl,
    });
    new cdk.CfnOutput(this, "graphql-key", {
      value: api.apiKey || "",
    });
  }
}
