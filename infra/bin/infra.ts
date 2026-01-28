#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { execSync } from "child_process";
import { FrontendStack } from "../lib/stacks/frontend-stack";
import { PipelineStack } from "../lib/stacks/pipeline-stack";

const app = new cdk.App();

const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION || "us-east-1";

const codeConnectionArn = app.node.tryGetContext("codeConnectionArn");
const repositoryName = app.node.tryGetContext("repositoryName") || "PawRush/React-Landing-Page-Template";
const branchName = app.node.tryGetContext("branchName") || "deploy-to-aws-20260128_174824-sergeyka";

// Manual deployment stacks (for preview environments)
if (!codeConnectionArn) {
  const getDefaultEnvironment = (): string => {
    try {
      const username = process.env.USER || execSync('whoami').toString().trim();
      return `preview-${username}`;
    } catch {
      return 'preview-local';
    }
  };

  const environment = app.node.tryGetContext("environment") || getDefaultEnvironment();
  const buildOutputPath = app.node.tryGetContext("buildPath") || "../build";

  new FrontendStack(app, `LandingPageFrontend-${environment}`, {
    env: { account, region },
    environment,
    buildOutputPath,
    description: `Static website hosting - ${environment}`,
    terminationProtection: environment === "prod",
  });

  cdk.Tags.of(app).add("Environment", environment);
}

// Pipeline stack (for automated deployments)
if (codeConnectionArn) {
  new PipelineStack(app, "LandingPagePipelineStack", {
    env: { account, region },
    description: "CI/CD Pipeline for LandingPage",
    codeConnectionArn,
    repositoryName,
    branchName,
    terminationProtection: true,
  });
}

cdk.Tags.of(app).add("Project", "LandingPage");
cdk.Tags.of(app).add("ManagedBy", "CDK");
