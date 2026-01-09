# Deployment Summary

Your app is deployed to AWS with a 'preview' URL that doesn't change when you update GitHub. Share this link with others.

**Live URL:** https://d1rgub7dvme5zy.cloudfront.net

To connect deployments to GitHub changes, ask your coding agent to `setup a AWS CodePipeline`.

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Production Readiness

For production deployments, consider:
- **WAF Protection**: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- **CSP Headers**: Configure Content Security Policy in CloudFront response headers
- **Custom Domain**: Set up Route 53 and ACM certificate
- **Monitoring**: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics

---

## Deployment Info

- **Stack name:** LandingPageFrontend-preview-sergeyka
- **Distribution ID:** EME2098GSM1II
- **S3 Bucket:** landingpagefrontend-preview-cftos3s3bucketcae9f2be-ljaaszqgwtwx
- **CloudFront Domain:** d1rgub7dvme5zy.cloudfront.net

## Deployment Command

```bash
./scripts/deploy.sh
```

## Recovery Guide

```bash
# Rollback
cd infra && npx cdk destroy --all

# Redeploy
./scripts/deploy.sh
```
