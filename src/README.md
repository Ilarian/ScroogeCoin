# How it works?

- App handles the order of components.
- Daterange component implements the inputs and sends them to Apicall.tsx
- Apicall fetches the data and parses it into UnifiedData object array, which is then filtered for a single datapoint closest to midnight for each day.
- UnifiedData array is then routed back to app, which passes it to displaydata component.
- Displaydata component then handles parsing the wanted information from the datapoint array.