import { test, expect, Page } from '@playwright/test';
import Mailosaur from 'mailosaur'

test.beforeEach(async ({ page }) => {
  await page.goto('https://accounts.kitabisa.com/register');
});

const MAILOSAUR_SERVERDOMAIN = `${process.env.MAILOSAUR_SERVERDOMAIN}`

test.describe('Register', () => {
  test('should success register', async ({ page }) => {
      
    const PASSWORD = `${process.env.PASSWORD_KITABISA}`
    const mailAddress = getEmailAddress()
    
    await page.type('input[data-testid=register-input-email]', mailAddress);
    await page.type('input[data-testid=register-input-name]', "John Doe");
    await page.locator('input[data-testid=register-input-name]').press('Enter');

    await delay(2000);
    const OTP = await checkOTP(page, mailAddress);

    await page.type('input[data-testid=input-otp]', OTP);
    await page.locator('button.text-center').click();

    await page.type('input[data-testid=input-new-password]', PASSWORD);
    await page.type('input[data-testid=input-confirmation-password]', PASSWORD);
    await page.locator('input[data-testid=input-confirmation-password]').press('Enter');

    await expect(page.locator('main#account-page')).toBeVisible();
    await expect(page.locator('div[data-testid=default-avatar] span')).toHaveText("JD");
  });

  test('should failed register with email already registered', async ({ page }) => {

    const EMAIL_REGISTERED = `${process.env.EMAIL_REGISTERED}`

    await page.type('input[data-testid=register-input-email]', EMAIL_REGISTERED);
    await page.type('input[data-testid=register-input-name]', "John Doe");
    await page.locator('input[data-testid=register-input-name]').press('Enter');

    await expect(page.locator('.bg-clrBlack70')).toBeVisible();

    const expectedMessage = `Email ${EMAIL_REGISTERED} telah terdaftar`
    await expect(page.locator('.bg-clrBlack70 div div p.text-clrBase')).toHaveText(expectedMessage);

    const expectedMessage2 = `Masuk ke akun dengan Email tersebut?`
    await expect(page.locator('.bg-clrBlack70 div div p.text-clrSubText')).toHaveText(expectedMessage2);

  });

});

async function checkOTP(page: Page, mailAddress: string) {

    const MAILOSAUR_SERVERID = `${process.env.MAILOSAUR_SERVERID}`

    const apiKey = `${process.env.MAILOSAUR_API_KEY}`;
    const mailosaur = new Mailosaur(apiKey);

    const serverId = MAILOSAUR_SERVERID;

    // Search for the email
    const email = await mailosaur.messages.get(serverId, {
        sentTo: mailAddress
    });

    const htmlBody = email.html.body 

    const pattern = /<div class="text-block" style="color: #00aeef;font-size: 27px;font-weight: 600;text-align: center;letter-spacing:5px;"> (.*?)<\/div>/;
    const matches = htmlBody.match(pattern);
    const data = matches;

    return data[1]
}

function getEmailAddress() {
    const randomString = new Date().getTime();
    const emailAddress = `${randomString}@${MAILOSAUR_SERVERDOMAIN}`;

    return emailAddress
}

function delay(time: number) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }