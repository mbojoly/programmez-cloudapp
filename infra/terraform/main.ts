import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider } from './.gen/providers/aws/aws-provider'
import { S3Bucket, S3BucketConfig } from './.gen/providers/aws/s3-bucket';
import { S3BucketObject, S3BucketObjectConfig } from './.gen/providers/aws/s3-bucket-object';
import * as fs from 'fs';

interface WebFile {
  name: string;
  mimeType: string;
}

const DEPLOY_DIR= '../../hello-cloud-app/dist/hello-angular/'

class ProgrammezCloudAppStack extends TerraformStack {
  AWS_REGION = 'eu-west-3';
  AWS_S3_BUCKET_NAME = 'programmez-cloudapp'
  TERRAFORM_RELATIVE_PATH = '../' //Execution takes place in .cdktf.out

  deployDir: string;

  constructor(scope: Construct, name: string, deployDir:string, webfiles: WebFile[]) {
    super(scope, name);

    this.deployDir = deployDir
    
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

    for(let webfile of webfiles) {
      console.log('file ' + webfile.name)
      const s3ObjectConfig: S3BucketObjectConfig = { 
        key: webfile.name, 
        source: this.TERRAFORM_RELATIVE_PATH + this.deployDir + webfile.name,
        contentType: webfile.mimeType,
        acl: 'public-read',
        bucket: s3Bucket.bucket ?? this.AWS_S3_BUCKET_NAME,
        tags: { 'stack':'programmez-cloudapp-stack' }
      } 
      new S3BucketObject(this, webfile.name, s3ObjectConfig);
    }
  }
}

class FilesLister {
  private MIME_TYPE_PER_EXTENSION = new Map([
    ['html', 'text/html'],
    ['css', 'text/css'],
    ['js', 'application/javascript'],
    ['ico', 'image/x-icon'],
    ['txt', 'text/text']
  ]); 
  
  private findMimeTypeBasedOnExtension(files: string[]) : WebFile[] {
    return files.map(f =>  {
      const fileNameSplit = f.split('.')
      const extension = fileNameSplit[fileNameSplit.length -1]
      return { name: f,  mimeType: this.MIME_TYPE_PER_EXTENSION.get(extension) ?? 'text/plain' }
    })
  }
  
  listFilesToDeploy(deployDirPath:string) : WebFile[] {
    const files: string[] = fs.readdirSync(deployDirPath);
    return this.findMimeTypeBasedOnExtension(files)
  }
}

const app = new App();
const filesLister = new FilesLister();
let webFiles: WebFile[] = filesLister.listFilesToDeploy(DEPLOY_DIR)
new ProgrammezCloudAppStack(app, 'programmezCloudAppStack', DEPLOY_DIR, webFiles);
app.synth();
