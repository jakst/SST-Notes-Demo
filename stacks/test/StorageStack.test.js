import { App, getStack } from "@serverless-stack/resources";
import { Template } from "aws-cdk-lib/assertions";
import { test } from "vitest";
import { StorageStack } from "../StorageStack";

test("Test StorageStack", () => {
  const app = new App();

  // WHEN
  app.stack(StorageStack);

  // THEN
  const template = Template.fromStack(getStack(StorageStack));
  template.hasResourceProperties("AWS::DynamoDB::Table", {
    BillingMode: "PAY_PER_REQUEST",
  });
});
