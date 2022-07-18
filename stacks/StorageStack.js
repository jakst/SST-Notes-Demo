import { Bucket, Table } from "@serverless-stack/resources";

export function StorageStack({ stack }) {
  // Create the DynamoDB table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: {
      partitionKey: "userId",
      sortKey: "noteId",
    },
  });

  // Create an S3 bucket
  const bucket = new Bucket(stack, "Uploads");

  return {
    table,
    bucket,
  };
}
