import { isEmpty } from "@/utils/isEmpty";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION || "",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_SECRET_ACCESS_KEY || "",
    }
  });
  
export const fetchImage = async (
  Key: any,
  defaultFile = null,
  folderName = ""
) => {
  if (isEmpty(Key)) {
    return defaultFile;
  } else {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: `${folderName}${Key}`,
      });

      return await getSignedUrl(s3Client, command, { expiresIn: 3000 });
    } catch (e) {
      return `${process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT}/${Key}`;
    }
  }
};