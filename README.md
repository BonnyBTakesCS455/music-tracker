# music-tracker

## Description:

Our Spotify tracker web app allows music listeners to view their music tastes and stats, analyze their listening history and trends, and compare with their friends. It is similar to Spotify Wrapped but supports more timeframes, will track more metrics and give you more insights on your music listening.

## Goal legend

- [x] Complete
- [!] Had progress but couldn't complete
- [ ] Haven't started

## Minimal Requirements:

- [x] As a user, I want to be able to see what songs/albums/artists I listen to the most
- [x] As a user, I want to be able to see what another user's favourite songs are
- [x] As a user, I want to see a comparison of how my music taste is similar to another user
- [x] As a user, I want to be able to click on songs, and have them taken to the spotify page

## Standard Requirements:

- [x] As a user, I want to be able to see cool graphs and stats about the music I listen to
- [x] As a user, I want to be able to add other users as friends
- [x] As a user, I want to be able to see some music stats of my friends
- [x] As a user, I want to be able to see my most listened to tracks and artists

## Stretch goals:

- [ ] As a user, I want to be able to share my stats on Instagram easily
- [x] As a user, I want to see song recommendations based off of the songs I recently listened to
- [!] As a user, I want to see a comparison of how my music taste is similar to another user
- [!] As a user, I want to be able to have a weekly generated playlist of my favourite songs
- [ ] Create a playlist using ML gathering a bunch of info from different users
- [] As a user, I want to be able to recommend my top songs to my friends.

## Minimal Tasks:

- [x] Set up Node/express backend
- [x] Stub out backend endpoints we will need
- [x] Set up OAuth Spotify login
- [x] Make a simple API call on behalf of the user
- [x] Create React App
- [x] Make a login page with a big login button

## Mockups:

![Mockup 1](https://raw.githubusercontent.com/BonnyBTakesCS455/music-tracker/main/login.png)
![Mockup 2](https://raw.githubusercontent.com/BonnyBTakesCS455/music-tracker/main/home.png)
![Mockup 3](https://raw.githubusercontent.com/BonnyBTakesCS455/music-tracker/main/friends.png)
![Mockup 4](https://raw.githubusercontent.com/BonnyBTakesCS455/music-tracker/main/insights_graph.png)
![Mockup 5](https://raw.githubusercontent.com/BonnyBTakesCS455/music-tracker/main/recommended.png)

## Tech used

- Unit 1
  - Because we used React, undoubtedly we had HTML, CSS and Javascript code in our React/JSX files. For most of our CSS, we used styled components, which was nice because we had the CSS and HTML all in one file.
- Unit 2
  - In our frontend, we used React and npm libraries that gave us React components for things like our graphs. React was awesome to use because of the re-usability factor with components and composition. Furthermore, `recharts`, the npm package we used for the graphs, was easy to use because it was already a React component and we just had to feed it some props.
- Unit 3
  - In our backend, we used express. Express made it easy for us to call REST APIs from our frontend, and keep all our business logic on the server side so that the client can't see what we're doing behind the scenes.
- Unit 4
  - For our database, we needed to store information on our users and some stuff about their music data. Using MongoDB was a much better solution than using something like a relational database because the set up is quicker and relational database would've been overkill for the data we stored.
- Unit 5
  - For our deployment, we used Heroku, which was nice to use especially after working with it in our assignments. We also used github actions to build the project before deploying it to Heroku, and even have a github action to check that our PRs are properly formatted, which makes our code nicer and more consistent.

## Above and beyond functionality

Our web app had to use Spotify APIs to retrieve all the information we needed and so we relied heavily on that. To access the APIs, we had to code OAuth logic for a user and retrieve their access token and refresh token so we could have retrieve data without having them to re-login everytime. The flow looked like this:
![Spotify Auth Flow](./AuthG_AuthoriztionCode.png) We also built a scraper that runs every hour on a CRON job to scrape user's listening history so we could track their listening history precisely. Much of the data we display is not accessible through just the Spotify APIs. There were some algorithms that we made that allowed us to create cool features of the app such as recommending songs and creating a playlist for the user instantly. Lastly, we created a robust friends system, where users can add/reject other users.

## Next steps

We believe we have some neat ideas for stretch goals and definitely would want to implement some of them. We would definitely tap into the social aspect of our app, and have more things to do with friends like automatically comparing two people's music tastes or making a playlist that two people could enjoy together. We already have the logic to retrieve data for one person, so we would next need to figure out a way to compare and combine the data together and present nicely. Another cool goal of ours would be to be able to show off a user's data to other forms of social media, so fitting some of the insights onto a mobile phone sized screen and being able to share it on Instagram or Facebook would be a neat feature.

## List of contributions

- Vandy worked on the Spotify controller (Spotify endpoint caller), the authorization flow, the radial graphs on the insights page, and the generated song recommendations.
- Adin worked on setting up the backend server, the MongoDB database and database schemas, as well as the backend logic for our friends feature.
- Ian worked on retrieving and saving user listening history, creating the scrape CRON job, and the insights controller.
- Samantha worked on the mockups, setting up the github actions and deployment to Heroku, and the most listened to artists component on the insights page.
- Calvin worked on most of the UI/UX, making it accessible and responsive, and created the friends sidebar component.
