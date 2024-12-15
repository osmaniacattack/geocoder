# Setup
## 1. Obtain Your Google Maps API Key and Enable Billing
[Google Geocoding API Docs](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)

## 2. Configuration
1. Clone repo to your desktop
2. Run `npm i` to install missing dependencies. It should just be Axios, Yargs, and Dotenv.
3. Create a .env file, place it in your src, and add in your api key like so: `API_KEY=your_key_here`

## 3. Usage
`npm run geocode "<address>"`

### Example
`npm run geocode "9555 Kings Charter Rd. # K, Ashland, VA 23005"`

Produces the log below:

```
Searching: 9555 Kings Charter Rd. # K, Ashland, VA 23005 ...

/////////////////////////////////////////
Latitude: 37.6920689
Longitude: -77.43635669999999
NWS Code: VAC085
/////////////////////////////////////////
```
