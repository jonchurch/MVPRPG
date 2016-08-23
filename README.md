# Chatbot Text Adventure
Playground for experimenting with creating text adventures in messenging apps. Think [MUDs](https://en.wikipedia.org/wiki/MUD) with emoji

# Bot Server
I'm using a paradigm I found in an article by @JonathanZWhite for the structure of the app. See his article about server-side infrastructure for building and supporting conversational interfaces  [here](https://medium.com/@JonathanZWhite/server-side-infrastructure-when-bots-invade-a2252e9d4bc9):cheers:

### Installation
##### Node
Run `$ npm install`

#### Telegram
1. Go into Telegram, talk to [BotFather](https://telegram.me/botfather).
2. Create a new bot.
3. Take the telegram token and add it to your environment variables or update `/config/index.js`
4. If you want to set your environment variable run `$ export TELEGRAM_TOKEN=your_token_here`

#### Spotify
1. Go to [developer.spotify.com](https://developer.spotify.com/)
2. Create a new app
3. Get the client id and secret and add it to your environment variables or update `/config/index.js`
4. Run `$ export SPOTIFY_CLIENT_ID=your_client_id_here`
5. Run `$ export SPOTIFY_CLIENT_SECRET=your_client_secret_here`

### Running
1. Run `$ npm start`
2. Text the bot you made during the installation process
3. Send 'help' for a list of commands and guidance
