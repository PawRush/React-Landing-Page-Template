# Deployment Summary

Your app is deployed to AWS with a 'preview' URL that doesn't change when you update GitHub. Share this link with others.

To connect deployments to GitHub changes, ask your coding agent to `setup a AWS CodePipeline`.

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name LandingPage-preview-sergeyka --query 'Stacks[0].StackStatus' --output text --no-cli-pager

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E3C8U1WR0WSRWF --paths "/*" --no-cli-pager

# Redeploy
./scripts/deploy.sh
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics

---

## Deployment Info

- Deployment URL: https://d2gb674vtulhnm.cloudfront.net
- Stack name: LandingPage-preview-sergeyka
- Distribution ID: E3C8U1WR0WSRWF
- S3 Bucket: landingpage-preview-sergeyk-cftos3s3bucketcae9f2be-aa5uff84nui7

## Build Configuration

| Item | Value |
|------|-------|
| Framework | Create React App (CRA) |
| Package manager | npm |
| Build command | npm run build |
| Output directory | build/ |
| Base path | / (root) |
| Entry point | index.html |
| CloudFront config | SPA (error responses → /index.html) |

## Recovery Guide

```bash
# Rollback
cd infra && npx cdk destroy --all

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

- Fixed lint error in src/components/contact.jsx (nested block from JSX comment in JS code)
