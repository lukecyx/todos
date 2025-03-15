import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: "eu-west-2",
  endpoint: "http://localhost:4566",
});

type SendEmailParams = {
  toAddress: string;
  fromAddress: string;
  subject: string;
  body: string;
  html: string;
};

function createSendEmailCommand({
  toAddress,
  fromAddress,
  subject,
  body,
  html,
}: SendEmailParams) {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
}
export async function sendEmail(params: SendEmailParams) {
  const command = createSendEmailCommand(params);
  try {
    console.log("✉️  Sending Email");
    const result = await sesClient.send(command);
    console.log(`✉️  Email Sent. MessageId: ${result.MessageId}`);
    return result;
  } catch (e) {
    console.error(e);
  }
}

await sendEmail({
  toAddress: "test@example.com",
  fromAddress: "hello@example.com",
  subject: "Test email",
  body: "body",
  html: "",
});
