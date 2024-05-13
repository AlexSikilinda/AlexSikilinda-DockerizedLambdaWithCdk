import * as cdk from "aws-cdk-lib";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFn = new DockerImageFunction(this, "DockerizedLambdaExample", {
      code: DockerImageCode.fromImageAsset("../src/DockerizedLambdaExample", {
        cmd: [
          "DockerizedLambdaExample::DockerizedLambdaExample.Function::FunctionHandler",
        ],
      }),
      timeout: cdk.Duration.seconds(600),
    });

    // Run the eventbridge every minute
    const rule = new events.Rule(this, "Rule", {
      schedule: events.Schedule.expression("cron(* * ? * * *)"),
    });

    // Add the lambda function as a target to the eventbridge
    rule.addTarget(new targets.LambdaFunction(lambdaFn));
  }
}
