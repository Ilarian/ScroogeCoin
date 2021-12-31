# How it works?

- App handles the order of components.
- Daterange component implements the inputs and sends data from them to Apicall
- Apicall fetches the data and parses it into UnifiedData object array, which is then filtered for a single datapoint closest to midnight for each day.
- UnifiedData array is then routed back to app, which passes it to displaydata component.
- Displaydata component handles parsing the wanted information from the array of datapoints.