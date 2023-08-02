import { getSesService } from '@/utils/aws';

export default async function sendContactRequest(
  name: string,
  phone: string,
  email: string,
  assocName: string,
  assocAddr: string,
  details: string,
) {
  const htmlBody = `<br>Name: ${name}<br>Phone: ${phone}<br>Email: ${email}<br>Association Name: ${assocName}<br>Association Addr: ${assocAddr}<br>Additional Details: ${details}`;
  const textBody = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nAssociation Name: ${assocName}\nAssociation Addr: ${assocAddr}\nAdditional Details: ${details}`;
  const params = {
    Destination: {
      // ToAddresses: ['gwyn@communityteammanagement.com'],
      ToAddresses: ['tevgrenrock@gmail.com'],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody,
        },
        Text: {
          Charset: 'UTF-8',
          Data: textBody,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New Contact Inquiry',
      },
    },
    Source: 'Gwyn <gwyn@communityteammanagement.com>',
  };
  const ses = getSesService();
  return new Promise((resolve, reject) => {
    ses.sendEmail(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
