import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider } from './.gen/providers/aws/aws-provider'
import { S3Bucket, S3BucketConfig } from './.gen/providers/aws/s3-bucket';
import { S3BucketObject, S3BucketObjectConfig } from './.gen/providers/aws/s3-bucket-object';

class ProgrammezCloudAppStack extends TerraformStack {
  AWS_REGION = 'eu-west-3';
  AWS_S3_BUCKET_NAME = 'programmez-cloudapp'

  constructor(scope: Construct, name: string) {
    super(scope, name);
    
    new AwsProvider(this, 'aws', {
      region: this.AWS_REGION
    });

    const s3BucketConfig: S3BucketConfig =  {
      website: [{
        indexDocument: 'index.html',
        errorDocument: 'index.html'
      }],
      tags: { 'stack':'programmez-cloudapp-stack' }
    };
    const s3Bucket = new S3Bucket(this, this.AWS_S3_BUCKET_NAME, s3BucketConfig);
    const s3ObjectConfig: S3BucketObjectConfig = { 
      key: 'index.html', 
      source: '../../../hello-cloud-app/index.html',
      contentType: 'text/html',
      acl: 'public-read',
      bucket: s3Bucket.bucket ?? this.AWS_S3_BUCKET_NAME,
      tags: { 'stack':'programmez-cloudapp-stack' }
    } 
    new S3BucketObject(this, 'index-page', s3ObjectConfig);
  }
}

const app = new App();
new ProgrammezCloudAppStack(app, 'terraform');
app.synth();
