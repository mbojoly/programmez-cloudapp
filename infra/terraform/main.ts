import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider } from './.gen/providers/aws/aws-provider'
import { S3Bucket } from './.gen/providers/aws/s3-bucket';

class ProgrammezCloudAppStack extends TerraformStack {
  AWS_REGION = 'eu-west-3';
  AWS_S3_BUCKET_NAME = 'programmez-cloudapp'

  constructor(scope: Construct, name: string) {
    super(scope, name);
    
    new AwsProvider(this, 'aws', {
      region: this.AWS_REGION
    });

    new S3Bucket(this, this.AWS_S3_BUCKET_NAME)
  }
}

const app = new App();
new ProgrammezCloudAppStack(app, 'terraform');
app.synth();
