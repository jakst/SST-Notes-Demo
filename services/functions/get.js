import dynamoDb from "../util/dynamodb";
import handler from "../util/handler";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The ID of the author
      noteId: event.pathParameters.id, // The ID of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found");
  }

  // Return the retrieved item
  return result.Item;
});
