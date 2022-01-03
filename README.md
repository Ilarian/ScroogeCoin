# Scrooge's Coin App

Fetches bitcoin data from CoinGecko's API from a given date range.

Data includes:
- Longest bearish trend (How many days in a row bitcoins price has fallen)
- Highest 24h volume
- "Timemachine" to evaluate what would have been the best day to buy and sell bitcoin
  for maximum profits.

## How to use?

### Heroku
There's an implementation on [Heroku](https://scroogescoinapp.herokuapp.com/)\
Startup might take a minute or two, if it the app hasn't been used recently.

### Local machine

#### Requirements
- git
- node (v.14.15.4 or higher)
- npm (8.3.0 or higher)

#### Setup instructions
- `git clone https://github.com/Ilarian/ScroogeCoin`
- `npm install`
- `npm start`