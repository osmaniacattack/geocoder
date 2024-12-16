# Setup
## 1. Obtain Your Google Maps API Key and Enable Billing
[Google Geocoding API Docs](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)

## 2. Configuration
1. Clone repo to your desktop
2. Run `npm i` to install missing dependencies. It should just be Axios, Yargs, and Dotenv.
3. Rename the .env.example file to be .env and add in your api key like so: `API_KEY=your_key_here`

## 3. Usage
`geocode-cli geocode "<address>"`

### Example
`geocode-cli geocode "1600 Amphitheatre Parkway, Mountain View, CA"`

Produces the log below:

```
Searching: 1600 Amphitheatre Parkway, Mountain View, CA ...

/////////////////////////////////////////
Latitude: 37.4225022
Longitude: -122.0847398
NWS Code: CAC085
/////////////////////////////////////////
```
