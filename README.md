# Scrooge's Coin App

Fetches bitcoin data from CoinGecko's API from a given date range.

Data includes:
- Longest bearish trend (How many days in a row bitcoins price has fallen)
- Highest 24h volume
- "Timemachine" to evaluate what would have been the best day to buy and sell bitcoin
  for maximum profits.

## How to use?

### Heroku
There's an implementation on [Azure](https://gray-forest-004cabe03.2.azurestaticapps.net/)\

### Local machine

#### Requirements
- git
- npm (I used 8.3.0 but pretty much anything should work)

#### Setup instructions
- `git clone https://github.com/Ilarian/ScroogeCoin`
- `cd ScroogeCoin`
- `npm install`
- `npm start`
