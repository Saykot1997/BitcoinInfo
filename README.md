## FacebookClone

This is a bitcoin information getting api.

## How to use the api

### Run the following scripts:

### `npm install`

That command will install all the dependencies of the app. After install all the dependencies you can run the app by run the following command.

### `npm start`

That will run the app in localhost:5000 you can see the "Hello World" in localhost:5000


## Run the app by Docker

I have build and push the images of the app in dockerhub so it is very easy to run the app by docker if the machine have docker installed.

Then run the following command to push and run the image in the localhost

### `docker run -p 5000:5000 saykot/bitcoin-info:1.0.0`

Then you can see the "Hello world" in the localhost:5000

## How to see the bitcoin informations

In search bar type `localhost:5000/getBitcoinInfo/?currency=eur`

or

In search bar type `localhost:5000/getBitcoinInfo/?currency=usd`

or

In search bar type `localhost:5000/getBitcoinInfo/?currency=gbp`


to see diffrent currencies present price and also highest and lowest price of the last 30 days


Thank you 

