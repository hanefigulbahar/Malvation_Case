<p align="center">
  <a href="#calling-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sparkles-main-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-setup">Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
</p>

## :calling: About
It is a web application that allows users to be managed.
This web application provides;
- User login
- List of users
- View the details of the selected user
- Editing the information of the selected user

## :gear: Technologies

- [React](https://github.com/facebook/react)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ReactRouter](https://reactrouter.com)
- [Redux-Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://www.npmjs.com/package/yup)

## :sparkles: Main Features

- The login page presents a form where users can enter their email and password. The user must enter this information correctly to log in to the system.
- The user list displays all registered users in the system. This list shows details such as each user's name, email address, phone number, role and account status. Users can also be deleted from this list.
- The User Update Page displays all the details of the selected user. Information such as the user's name, email address, phone number, role, and account status can be viewed and updated on this page.
- If any user tries to access the user list or user detail page without logging in, the user will be redirected to the login page.
- If there are any problems loading the pages, the user will be shown an error page.


## :gear: Setup
1. First of all, since this web page works with the data it receives via json-server, the following project should be installed and run on port 3000.

[UserListServer](https://github.com/hanefigulbahar/UserListServer/tree/main)

`git clone https://github.com/hanefigulbahar/UserListServer.git`

2. The project is then set up.

`npm i`

3. In the last step the project is run.

`npm run dev`

4. You can use these users for login.

```
Name: Trycia Fadel
Mail: dpierrof@vimeo.com
Password: Vru55Y4tufI4
```

```
Name: Jeanne Halvorson
Mail: kminchelle@qq.com
Password: 0lelplR
```

```
Name: Enoch Lynch
Mail: mturleyd@tumblr.com
Password: GyLnCB8gNIp
```

This project was developed using [Vite](https://vitejs.dev) tool.

## :memo: License 
This project is under the terms of the MIT license.
<br/>
<br/>
Contact: https://www.linkedin.com/in/hanefigulbahar/
