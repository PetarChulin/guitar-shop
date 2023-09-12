## GUITAR SHOP 

This is a simple demo app made with React. It uses Firebase/Firestore database to manage data.
The purpose of the application is to demonstrate the very basic functionalities of an e-shop using CRUD operations.
You can register with email and password or log in with your Google account. After log in you can
add or remove products to your cart as well as see details for chosen product. There is a predifined
admin account which can add/delete items to/from database. If you want to try admin access please 
contact me to provide it. /petercbg@abv.bg/This project is under development and constant addition
of new functionalities, but it is fully operational.

You can access the project on: https://guitars-shop.web.app
                    or
download repository from "<>Code" button open it in some IDE (I preffer and recommend VSCode)
and run "npm install" then "npm start" in terminal.You have to have NPM installed on your
system as well as Firebase Project with Firestore Database created (it is simple and free to create one)
and Firebase Authentication with Email/Password and Google sign-in methods enabled.
All you have to do next is to navigate to /src/utils/firebase/firebase.utils.js and replace 
the values ​​from line 29 to line 34 with your own found in the section "Project Settings" in your Firebase Project.

![Cloud firestore](firestore.png)
![Authentication](auth.png)