# Jammming

A simple Spotify playlist maker created as part of a [Codecademy](https://www.codecademy.com/) project.

## Spotify Playlist sample app
---

You can visit the app at http://night-owl.surge.sh

## To clone this project
---

1. On your terminal, enter the following command:

```
$ git clone https://github.com/barbs89/jammming.git
```
2. Start the server locally
```
$ npm start
```
3. Visit `http://localhost:3000` on your browser.


## To deploy the app to Surge
---

This app was deployed using Surge. For more information on getting started with Surge please [click here.](https://surge.sh/help/getting-started-with-surge).

1. Install Surge:

		$ npm install -g surge
	
2. Run the Create React App build:

    
		$ cd your-react-project
		$ npm run build
		

3. Switch into the build directory:
		
		$	cd build
		
4. Run Surge, and follow the prompts. All it needs is an email and a password, and you can optionally specify a different domain name.

		$ surge
		

5. specify subdomain i.e. `night-owl.surge.sh`

6. visit your subdomain i.e. `http://night-owl.surge.sh`

## Improvements
---

Currently, the app requires the user to enter the song/artist/album name twice before rendering the results. I would like to improve the app by ensuring the results are shown on the first input from the user.

