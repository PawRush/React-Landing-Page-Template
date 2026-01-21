
---

# Pipeline Deployment: React Landing Page

**Deployment completed**: 2026-01-21 20:56:00 UTC
**SOP used**: setup-pipeline from AWS MCP

## Pipeline Configuration

- **Pipeline Name**: LandingPagePipeline
- **Repository**: PawRush/React-Landing-Page-Template
- **Branch**: deploy-to-aws
- **Quality Checks**: lint, test:ci, secretlint
- **CodeConnection Status**: ✅ AVAILABLE

## Pipeline Stages

1. **Source**: Pull code from GitHub (deploy-to-aws branch)
2. **Build**: Run quality checks (lint, test:ci) + CDK synth
3. **UpdatePipeline**: Self-mutate if pipeline code changed
4. **Assets**: Publish file assets to S3
5. **Deploy**: Deploy LandingFrontend-prod stack

## How to Deploy

```bash
# Make changes to your code
git add .
git commit -m "your changes"
git push origin deploy-to-aws

# Pipeline automatically triggers and deploys to production
```

## Pipeline Info

- Pipeline URL: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/LandingPagePipeline/view
- CodeConnection ARN: arn:aws:codeconnections:us-east-1:126593893432:connection/c140aa0c-7407-42c9-aa4b-7c81f5faf40b
- Production Stack: LandingFrontend-prod

## Troubleshooting

### Pipeline Fails at Build Stage

Check build logs:
```bash
aws logs tail "/aws/codebuild/LandingPagePipelineStack-PipelineBuildSynthCdkBuildProject" --follow
```

Common issues:
- Lint failures: Run `npm run lint -- --fix` locally
- Test failures: Run `npm run test:ci` locally to debug
- Secrets detected: Remove secrets from code

### Pipeline Fails at Deploy Stage

Check CloudFormation events:
```bash
aws cloudformation describe-stack-events --stack-name "LandingFrontend-prod" --max-items 20
```

## Recovery Guide

```bash
# Destroy pipeline
cd infra && npm run destroy:pipeline

# Redeploy pipeline
cd infra && npm run deploy:pipeline

# Manual pipeline trigger
aws codepipeline start-pipeline-execution --name "LandingPagePipeline"
```

## Session Log

### Session 2 - 2026-01-21 20:50:00 UTC
Agent: Claude Sonnet 4.5
Progress: Pipeline deployment completed
Status: ✅ Pipeline active and running
