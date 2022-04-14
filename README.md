# **Sample Automate Test on Register Page**

## Introduction
In this example, we will do an automate test on the register page of kitabisa.com until we successfully get the OTP on the email and successfully register the user. (include github action sample)

## Getting Started
> Please make sure you already have account in [mailosaur](https://mailosaur.com/) and please read the detail [doc mailosaur](https://mailosaur.com/docs/) for get credential
 1. Clone this repository `git clone https://github.com/albertsiempre/play-wright-webui-test` or `git@github.com:albertsiempre/play-wright-webui-test.git`
 2. Run `npm i -D @playwright/test` for install playwright
 3. Run `npx playwright install` for install supported browser
 4. Run `npm install mailosaur --save-dev` for install mailosaur lib
 5. Set Environment Variables, please see below.

## Environment Variable Configuration

> Please configure this the OS environment variable
> example : `export YOUR_VARIABLE=your_value`

| Variable | Description
| - | -
| `MAILOSAUR_API_KEY` | Mailosaur API Key
| `MAILOSAUR_SERVERDOMAIN` | Mailosaur Server Domain
| `MAILOSAUR_SERVERID` | Mailosaur Server ID
| `EMAIL_REGISTERED` | Use for negative scenario email already registered on system
| `PASSWORD_KITABISA` | Your password for login to system
