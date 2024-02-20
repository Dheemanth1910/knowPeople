
# knowPeople


"knowPeople: A Comprehensive Social Connection Platform - Fulfilling Mutual Interests and Preferences"

## Installation

-  Clone this project using git clone. 

```bash
  git clone https://github.com/Dheemanth1910/knowPeople.git
```

- Navigate insdide the main folder(knowPeople) and install node module
```bash
  npm install or 
  npm i
```
And you should create your .env file similar to this:
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY= 
S3_REGION=
S3_BUCKET=
MONGO_URl= 
```
Also create a new credentials folder and navigate inside it and create a file called "gmail.cred.js" inside it write following code : 

```
const username = "your mail"
const pwd ='your password'

module.exports = {username,pwd};
``` 

You can run the server using the following command :
```
npm run start
```
## Features
### User Registration and Authentication:

- Registration via email.
- Unique username requirement for each user.
- Authentication using passport and bcrypt

### Profile Management:

- Ability for users to create and edit profiles.
- Inclusion of basic information such as name, age, and bio.

### Matching and notifications :
- Recent activity in home-page
- Notification system for likes. 

### Performance:

Fast loading of profiles and match suggestions 

### Scalability:

- Designing the system to scale efficiently with increasing user base.
## 🔗 Links
[click here to view website](http://18.61.184.239:3000/)


## Badges



[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

