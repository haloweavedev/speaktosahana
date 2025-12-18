Geocoding v6
This is the documentation for the latest version of Mapbox Geocoding, v6.

If you are looking for the previous version, see the Geocoding v5 API documentation.

The Mapbox Geocoding API does two things: forward geocoding and reverse geocoding:

Forward geocoding converts location text into geographic coordinates, turning 2 Lincoln Memorial Circle SW into -77.050,38.889.
Reverse geocoding turns geographic coordinates into place names, turning -77.050, 38.889 into 2 Lincoln Memorial Circle SW. These location names can vary in specificity, from individual addresses to states and countries that contain the given coordinates.
What's new in v6?
Secondary address support allows for retrieving apartment units and business suites via forward geocoding, including those with coordinates unique from their parent address.
Structured Input allows queries to be separated into component parts for greater accuracy.
Smart Address Match makes the match_code object available in all responses for address-type features, and indicates how well a result corresponds to the submitted query.
Improved Batch geocoding sends up to 1000 queries of mixed-type in a single request. API rate limits still apply and each query will be counted as 1 request.
Expanded Japan coverage gives access to robust Japanese address search.
Migrating from Geocoding v5
Permanent and temporary geocoding are no longer different endpoints, and are now set via an optional parameter. The default behavior for all endpoints is temporary geocoding.
Forward and reverse geocoding now have their own separate endpoints.
Batch geocoding now has it's own endpoint.
The Geocoding v6 API no longer provides POI data (use the Search Box API for POI search).
Streets can now be returned as a feature type and be filtered for via the types parameter.
Geocoding from Snowflake
Snowflake users can do batch geocoding operations on data stored in their data warehouse. The Mapbox Snowflake Native App is available in the Snowflake Marketplace.

For more background information on the Mapbox Geocoding API and how it works, see the How geocoding works guide.

You may also use one of several wrapper libraries to integrate the Mapbox Geocoding API into an application instead of using it directly.

For Mapbox Search JS SDK, Geocoding components are available on releases 1.0.0-beta.20 and later.
PLAYGROUND
Geocoding API playground
Try forward, reverse, and batch geocoding queries and see the results on a map.

Geographic Feature Types
Various types of geographic features are available the Mapbox geocoding. Any type might appear as a top-level response, as context in a top-level response, or as a filtering option using the types parameter. Not all features are available or relevant in all parts of the world. New types are occasionally added as necessary to correctly capture global administrative hierarchies.

The geographic feature types listed from the largest to the most granular, are:

Feature Type	Description
country	Generally recognized countries or, in some cases like Hong Kong, an area of quasi-national administrative status that has a designated country code under ISO 3166-1.
region	Top-level sub-national administrative features, such as states in the United States or provinces in Canada or China.
postcode	Postal codes used in country-specific national addressing systems.
district	Features that are smaller than top-level administrative features but typically larger than cities, in countries that use such an additional layer in postal addressing (for example, prefectures in China).
place	Typically these are cities, villages, municipalities, etc. They’re usually features used in postal addressing, and are suitable for display in ambient end-user applications where current-location context is needed (for example, in weather displays).
locality	Official sub-city features present in countries where such an additional administrative layer is used in postal addressing, or where such features are commonly referred to in local parlance. Examples include city districts in Brazil and Chile and arrondissements in France.
neighborhood	Colloquial sub-city features often referred to in local parlance. Unlike locality features, these typically lack official status and may lack universally agreed-upon boundaries.
street	Street features which host one or more addresses
block	Special feature type reserved for Japanese addresses.
address	Individual residential or business addresses.
secondary_address	Sub-unit, suite, or lot within a single parent address. Currently available in the US only.
Storing Geocoding Results
The Mapbox Geocoding API offers two types of result storage: Permanent and Temporary.

Temporary results are not allowed to be cached, while Permanent results are allowed to be cached and stored indefinitely.

Using Permanent storage with the Geocoding API requires that you have a valid credit card on file or an active enterprise contract.

By default, the Geocoding API will use Temporary geocoding. To use Permanent geocoding, set the optional permanent parameter to true.

Forward geocoding with search text input
get
https://api.mapbox.com/search/geocode/v6/forward?q={search_text}
The forward geocoding query type allows you to look up a location using a string of search text and returns its standardized address, geographic context, and coordinates.

Required parameters	Type	Description
q	string	The feature you’re trying to look up. This could be an address, a city name, etc. The search text should be expressed as a URL-encoded UTF-8 string, and must not contain the semicolon character (either raw or URL-encoded). Your search text, once decoded, must consist of at most 20 words and numbers separated by spacing and punctuation, and at most 256 characters.

The accuracy of coordinates returned by a forward geocoding request can be affected by how the addresses in the query are formatted. Learn more about address formatting best practices in the Address geocoding format guide.
access_token	string	All geocoding requests must include an access token.
You can further refine the results of a forward geocoding query with the following optional parameters:

Optional parameters	Type	Description
permanent	boolean	Specify whether you intend to store the results of the query (true) or not (false, default).
autocomplete	boolean	Specify whether to return autocomplete results (true, default) or not (false). When autocomplete is enabled, results will be included that start with the requested string, rather than responses that match it exactly. For example, a query for India might return both India and Indiana with autocomplete enabled, but only India if it’s disabled.

When autocomplete is enabled, each user keystroke counts as one request to the Geocoding API. For example, a search for "Cali" would be reflected as four separate Geocoding API requests. To reduce the total requests sent, you can configure your application to only call the Geocoding API after a specific number of characters are typed.
bbox	number	Limit results to only those contained within the supplied bounding box. Bounding boxes should be supplied as four numbers separated by commas, in minLon,minLat,maxLon,maxLat order. The bounding box cannot cross the 180th meridian.
You can use the Location Helper to find a bounding box for use with this API.
country	string	Limit results to one or more countries. Permitted values are ISO 3166 alpha 2 country codes separated by commas.
format	string	Specify the desired response format of results (geojson, default) or for backwards compatibility (v5).
language	string	Set the language of the text supplied in responses. Also affects result scoring, with results matching the user’s query in the requested language being preferred over results that match in another language. For example, an autocomplete query for things that start with Frank might return Frankfurt as the first result with an English (en) language parameter, but Frankreich (“France”) with a German (de) language parameter.

Options are IETF language tags comprised of a mandatory ISO 639-1 language code and, optionally, one or more IETF subtags for country or script. More than one value can also be specified, separated by commas. The first language in the list will be considered as the primary language and a response will be generated for it. For other languages, translations will be provided, see the translations section.

For more information on which specific languages are supported, see the language coverage section.
limit	integer	Specify the maximum number of results to return. The default is 5 and the maximum supported is 10.
proximity	string	Bias the response to favor results that are closer to this location. Provided as two comma-separated coordinates in longitude,latitude order, or the string ip to bias based on reverse IP lookup.
types	string	Filter results to include only a subset (one or more) of the available feature types. Options are country, region, postcode, district, place, locality, neighborhood, street, and address. Multiple options can be comma-separated.

For more information on the available types, see the geographic feature types section.
worldview	string	Returns features that are defined differently by audiences that belong to various regional, cultural, or political groups. Available worldviews are: ar,cn,in,jp,ma,rs,ru,tr,us. If worldview is not set, the us worldview boundaries are returned by default.

For more information about using the worldview parameter, see the worldviews section.
Example requests: Forward geocoding with search text input
# A basic forward geocoding request
# Find Los Angeles

curl "https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"

# Find a town called 'Chester' in a specific region
# Add the proximity parameter with local coordinates
# This ensures the town of Chester, New Jersey is in the results

curl "https://api.mapbox.com/search/geocode/v6/forward?q=chester&proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"

# Specify types=country to search only for countries named Georgia
# Results will exclude the American state of Georgia

curl "https://api.mapbox.com/search/geocode/v6/forward?q=georgia&types=country&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"

# Limit the results to two results using the limit option
# Even though there are many possible matches
# for "Washington", this query will only return two results.

curl "https://api.mapbox.com/search/geocode/v6/forward?q=Washington&limit=2&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"

# Search for the Place feature "Kaaleng" in the Ilemi Triangle. Specifying the cn worldview will return the country value South Sudan. Not including leaving the worldview parameter would default to the us worldview and return the country value Kenya.

curl "https://api.mapbox.com/search/geocode/v6/forward?q=Kaaleng&worldview=cn&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"
Response: Forward geocoding with search text input
See the Geocoding response object section.

Querying for Secondary Addresses
If no types parameter is set, or the "secondary_address" type is included in the types filter, searching for secondary addresses will be enabled. - Secondary address queries are detected after a "designator" token (e.g. "Apt", "Suite", "Unit", "#") is followed by an identifier token (e.g. "12B", "A", "103"). - If a parent address is known to have secondary addresses, we will first return known units within our data matching the provided identifier. If the identifier is not known in our data, the unit will be "extrapolated", i.e. returned as typed with the same coordinate as the parent address.
Forward geocoding with structured input
New in v6
get
https://api.mapbox.com/search/geocode/v6/forward?address_number={address_number}&street={street}&...
Structured Input is a type of forward geocoding search that allows you to define the feature type of each element of the search query by type. This can increase the accuracy of results for well-formed datasets. To use Structured Input, the q parameter is dropped in favor of separate parameters for each feature type.

For best results, each element of the query must be assigned a feature type, and set autocomplete to false.

Required parameters	Type	Description
access_token	string	All geocoding requests must include an access token.
The following feature types can be defined in a Structured Input query:

Optional parameters	Type	Description
address_line1	string	A string including address_number and street. These values can be provided as separate parameters address_number and street listed below.
address_number	string	The number associated with the house.
street	string	The name of the street in the address
block	string	In some countries like Japan, the block is a component in the address
place	string	Typically these are cities, villages, municipalities, etc. They’re usually features used in postal addressing, and are suitable for display in ambient end-user applications where current-location context is needed (for example, in weather displays).
region	string	Top-level sub-national administrative features, such as states in the United States or provinces in Canada or China.
postcode	string	Postal codes used in country-specific national addressing systems.
locality	string	Official sub-city features present in countries where such an additional administrative layer is used in postal addressing, or where such features are commonly referred to in local parlance. Examples include city districts in Brazil and Chile and arrondissements in France.
neighborhood	string	Colloquial sub-city features often referred to in local parlance. Unlike locality features, these typically lack official status and may lack universally agreed-upon boundaries. Not available for reverse geocoding requests.
country	string	Either the ISO 3166-1 code or the full country name. When the ISO code is passed as parameter it acts as a hard filter on search results. When a full country name is passed, it is not a hard filter but influences the search results.
You can further refine the results of a forward geocoding query with the following optional parameters:

Optional parameters	Type	Description
permanent	boolean	Specify whether you intend to store the results of the query (true) or not (false, default).
autocomplete	boolean	Specify whether to return autocomplete results (true, default) or not (false). When autocomplete is enabled, results will be included that start with the requested string, rather than responses that match it exactly. For example, a query for India might return both India and Indiana with autocomplete enabled, but only India if it’s disabled.

When autocomplete is enabled, each user keystroke counts as one request to the Geocoding API. For example, a search for "Cali" would be reflected as four separate Geocoding API requests. To reduce the total requests sent, you can configure your application to only call the Geocoding API after a specific number of characters are typed.
bbox	number	Limit results to only those contained within the supplied bounding box. Bounding boxes should be supplied as four numbers separated by commas, in minLon,minLat,maxLon,maxLat order. The bounding box cannot cross the 180th meridian.
You can use the Location Helper to find a bounding box for use with this API.
format	string	Specify the desired response format of results (geojson, default) or for backwards compatibility (v5).
language	string	Set the language of the text supplied in responses. Also affects result scoring, with results matching the user’s query in the requested language being preferred over results that match in another language. For example, an autocomplete query for things that start with Frank might return Frankfurt as the first result with an English (en) language parameter, but Frankreich (“France”) with a German (de) language parameter.

Options are IETF language tags comprised of a mandatory ISO 639-1 language code and, optionally, one or more IETF subtags for country or script.

More than one value can also be specified, separated by commas. The first language in the list will be considered as the primary language and a response will be generated for it. For other languages, translations will be provided, see the translations section.

For more information on which specific languages are supported, see the language coverage section.
limit	integer	Specify the maximum number of results to return. The default is 5 and the maximum supported is 10.
proximity	string	Bias the response to favor results that are closer to this location. Provided as two comma-separated coordinates in longitude,latitude order, or the string ip to bias based on reverse IP lookup.
types	string	Filter results to include only a subset (one or more) of the available feature types. Options are country, region, postcode, district, place, locality, neighborhood, street, and address. Multiple options can be comma-separated.

For more information on the available types, see the geographic feature types section.
worldview	string	Returns features that are defined differently by audiences that belong to various regional, cultural, or political groups. Available worldviews are: ar,cn,in,jp,ma,rs,ru,tr,us. If worldview is not set, the us worldview boundaries are returned by default.

For more information about using the worldview parameter, see the worldviews section.
Example request: Forward geocoding with structured input
curl --location --request GET "https://api.mapbox.com/search/geocode/v6/forward?country=us&address_number=1600&street=pennsylvania%20ave%20nw&postcode=20500&place=Washington%20dc&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"
Response: Forward geocoding with structured input
See the Geocoding response object section.

Reverse geocoding
get
https://api.mapbox.com/search/geocode/v6/reverse?longitude={longitude}&latitude={latitude}
The reverse geocoding query type allows you to look up a pair of coordinates and returns the geographic features there, including a standardized address or place and full geographic context.

Required parameters	Type	Description
longitude	number	The longitude decimal value from the geographic coordinate for the location being queried.
latitude	number	The latitude decimal value from the geographic coordinate for the location being queried.
access_token	string	All geocoding requests must include an access token.
You can further refine the results of a reverse geocoding query with the following optional parameters:

Optional parameters	Type	Description
permanent	boolean	Specify whether you intend to store the results of the query (true) or not (false, default).
country	string	Limit results to one or more countries. Permitted values are ISO 3166 alpha 2 country codes separated by commas.
language	string	Specify the user’s language. This parameter controls the language of the text supplied in responses.

Options are IETF language tags comprised of a mandatory ISO 639-1 language code and, optionally, one or more IETF subtags for country or script.

Only one value can also be specified.

For more information on which specific languages are supported, see the language coverage section.
limit	integer	Specify the maximum number of results to return. The default is 1 and the maximum supported is 5.

The default behavior in reverse geocoding is to return at most one feature at each of the multiple levels of the administrative hierarchy (for example, one address, one region, one country). Increasing the limit allows returning multiple features of the same type, but only for one type (for example, multiple address results). So, setting limit to a higher-than-default value requires specifying exactly one types parameter.
types	string	Filter results to include only a subset (one or more) of the available feature types. Options are country, region, postcode, district, place, locality, neighborhood, street, and address. Multiple options can be comma-separated.

For more information on the available types, see the geographic feature types section.
worldview	string	Returns features that are defined differently by audiences that belong to various regional, cultural, or political groups. Available worldviews are: ar,cn,in,jp,ma,rs,ru,tr,us. If worldview is not set, the us worldview boundaries are returned by default.

For more information about using the worldview parameter, see the worldviews section.
Example request: Reverse geocoding
# A basic reverse geocoding request

# Retrieve places near a specific location

curl "https://api.mapbox.com/search/geocode/v6/reverse?longitude=-73.989&latitude=40.733&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"

# Filter results to only include addresses

curl "https://api.mapbox.com/search/geocode/v6/reverse?longitude=-73.989&latitude=40.733&types=address&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"

# Query within the Ilemi Triangle to return features for the US worldview

curl "https://api.mapbox.com/search/geocode/v6/reverse?longitude=35.4628&latitude=4.8975&worldview=us&access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"
Response: Reverse geocoding
The API response for a reverse geocoding query returns a GeoJSON feature collection in Mapbox Geocoding Response format. For more details on how a response from the Geocoding API is formatted, see the Geocoding response object section.

Batch geocoding
Improved in v6
Geocoding from Snowflake
Snowflake users can do batch geocoding operations on data stored in their data warehouse. The Mapbox Snowflake Native App is available in the Snowflake Marketplace.

post
https://api.mapbox.com/search/geocode/v6/batch
The batch geocoding query type allows you to request up to 1000 forward or reverse geocoding queries in a single request.

Batch geocoding requests are formatted as a JSON object passed as the BODY of the request, but with multiple search queries one after another. Fields which were defined as query parameters in the URL string will become fields in the JSON object. Fields specifying multiple values (for example types, country, bbox, proximity) can be passed either as a comma-separated strings or as JSON-formatted arrays (for example a types filter value could be represented as "address,street,place" or ["address", "street", "place"]).

In a single batch geocoding request, you can bundle queries of different types, including forward queries, forward Structure Input queries, and reverse queries. Each query can also has parameters defined individually -- for example one query could have IP proximity set to on while the rest have it off.

Billing for batch geocoding requests
Each individual search in a batch geocoding request counts as one request.

You can make a batch geocoding request by using an HTTP POST request with the following body structure:

https://api.mapbox.com/search/geocode/v6/batch
Request Body

[
    {
        "types": ["address"],
        "q": "1600 Pennsylvania Avenue NW, Washington, DC 20500, United States",
        "bbox": [-80, 35, -70, 40],
        "limit": 1
    },
    {
        "types": ["address"],
        "longitude": -73.986136,
        "latitude": 40.748895
    }
]
Required parameters	Type	Description
access_token	string	All geocoding requests must include an access token.
Optional parameters	Type	Description
permanent	boolean	Specify if you intend to store the results of the query (true) or not (false, default).
Example request: Batch geocoding
curl --location --request POST "https://api.mapbox.com/search/geocode/v6/batch?access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA" \
--header 'Content-Type: application/json' \
--data-raw '[
    {/**** FORWARD GEOCODING REQUEST ****/
        "types": ["address"],
        "q": "1600 Pennsylvania Avenue NW, Washington, DC 20500, United States",
        "bbox": [-80, 35, -70, 40],
        "limit": 1
    },
    { /**** FORWARD GEOCODING REQUEST USING STRUCTURED INPUT ****/
        "country": "us",
        "address_number": "1600",
        "street": "Pennsylvania Avenue NW",
        "postcode": "20500",
        "place": "Washington, DC"
    },
    {/**** REVERSE GEOCODING REQUEST ****/
        "types": ["address"],
        "longitude": -73.986136,
        "latitude": 40.748895
    }
]'
Response: Batch geocoding
The response from a batch geocoding query is an object with a batch property. The batch property is an array of Geocoding response objects. The order of queries in the request determines the order of corresponding objects in the batch array. If there are no results returned for a particular query within the batch, the features array for that query is empty ( "features": []  ).

Here's an example request in which there is a list of three queries. The first two requests are for forward geocoding, and the last one is for reverse.

curl --location --request POST 'https://api.mapbox.com/search/geocode/v6/batch?access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA&permanent=true' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "types": ["address"],
        "q": "1600 Pennsylvania Avenue NW, Washington, DC 20500, United States",
        "bbox": [-80, 35, -70, 40],
        "limit": 1
    },
    {
        "types": ["address"],
        "q": "aslkdjf",
        "bbox": [-80, 35, -70, 40]
    },
    {
        "types": ["address"],
        "longitude": -73.986136,
        "latitude": 40.748895
    }
]'
Notice that in the response, the results are in same the order as the queries in the request, where the second query aslkdjf doesn't return a result but still exists in the second position of the array:

{
  "batch": [
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "id": "dXJuOm1ieGFkcjo2YzdhYjM4Yi05YzM4LTQ3ZDItODFkMS1jYzZlYjg5YzliMWM",
          "geometry": {
            "type": "Point",
            "coordinates": [-77.03655, 38.89768]
          },
          "properties": {
            "mapbox_id": "dXJuOm1ieGFkcjo2YzdhYjM4Yi05YzM4LTQ3ZDItODFkMS1jYzZlYjg5YzliMWM",
            "feature_type": "address",
            "name": "1600 Pennsylvania Avenue Northwest",
            "coordinates": {
              "longitude": -77.03655,
              "latitude": 38.89768,
              "accuracy": "rooftop"
            },
            "place_formatted": "Washington, District of Columbia 20500, United States",
            "match_code": {
              "address_number": "matched",
              "street": "matched",
              "postcode": "matched",
              "place": "matched",
              "region": "matched",
              "locality": "not_applicable",
              "country": "inferred",
              "confidence": "exact"
            },
            "context": {
              "address": {
                "mapbox_id": "dXJuOm1ieGFkcjo2YzdhYjM4Yi05YzM4LTQ3ZDItODFkMS1jYzZlYjg5YzliMWM",
                "address_number": "1600",
                "street_name": "Pennsylvania Avenue Northwest",
                "name": "1600 Pennsylvania Avenue Northwest"
              },
              "street": {
                "mapbox_id": "dXJuOm1ieGFkcjo2YzdhYjM4Yi05YzM4LTQ3ZDItODFkMS1jYzZlYjg5YzliMWM",
                "name": "Pennsylvania Avenue Northwest"
              },
              "neighborhood": {
                "mapbox_id": "dXJuOm1ieHBsYzpHYUVzN0E",
                "name": "National Mall",
                "alternate": {
                  "mapbox_id": "dXJuOm1ieHBsYzpEY1ZNN0E",
                  "name": "Franklin Mcpherson Square"
                }
              },
              "postcode": {
                "mapbox_id": "dXJuOm1ieHBsYzpBOEZPN0E",
                "name": "20500"
              },
              "place": {
                "mapbox_id": "dXJuOm1ieHBsYzpGSmlvN0E",
                "name": "Washington",
                "wikidata_id": "Q61"
              },
              "region": {
                "mapbox_id": "dXJuOm1ieHBsYzpCUVRz",
                "name": "District of Columbia",
                "wikidata_id": "Q3551781",
                "region_code": "DC",
                "region_code_full": "US-DC"
              },
              "country": {
                "mapbox_id": "dXJuOm1ieHBsYzpJdXc",
                "name": "United States",
                "wikidata_id": "Q30",
                "country_code": "US",
                "country_code_alpha_3": "USA"
              }
            }
          }
        }
      ],
      "attribution": "NOTICE: © 2023 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
    },
    {
      "type": "FeatureCollection",
      "features": [],
      "attribution": "NOTICE: © 2023 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
    },
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "id": "dXJuOm1ieGFkcjplMzVmMzZiOC1kYjRmLTQyOWItOWE4ZC0yZGQ3ZmQ1OTUzMTY",
          "geometry": {
            "type": "Point",
            "coordinates": [-73.9861365, 40.7488949]
          },
          "properties": {
            "mapbox_id": "dXJuOm1ieGFkcjplMzVmMzZiOC1kYjRmLTQyOWItOWE4ZC0yZGQ3ZmQ1OTUzMTY",
            "feature_type": "address",
            "name": "20 West 34th Street",
            "coordinates": {
              "longitude": -73.9861365,
              "latitude": 40.7488949,
              "accuracy": "rooftop"
            },
            "place_formatted": "New York, New York 10118, United States",
            "context": {
              "address": {
                "mapbox_id": "dXJuOm1ieGFkcjplMzVmMzZiOC1kYjRmLTQyOWItOWE4ZC0yZGQ3ZmQ1OTUzMTY",
                "address_number": "20",
                "street_name": "West 34th Street",
                "name": "20 West 34th Street"
              },
              "street": {
                "mapbox_id": "dXJuOm1ieGFkcjplMzVmMzZiOC1kYjRmLTQyOWItOWE4ZC0yZGQ3ZmQ1OTUzMTY",
                "name": "West 34th Street"
              },
              "neighborhood": {
                "mapbox_id": "dXJuOm1ieHBsYzpGQ2VNN0E",
                "name": "Koreatown"
              },
              "postcode": {
                "mapbox_id": "dXJuOm1ieHBsYzpBWUFPN0E",
                "name": "10118"
              },
              "locality": {
                "mapbox_id": "dXJuOm1ieHBsYzpGREtLN0E",
                "name": "Manhattan",
                "wikidata_id": "Q11299"
              },
              "place": {
                "mapbox_id": "dXJuOm1ieHBsYzpEZTVJN0E",
                "name": "New York",
                "wikidata_id": "Q60"
              },
              "district": {
                "mapbox_id": "dXJuOm1ieHBsYzpBUU5tN0E",
                "name": "New York County",
                "wikidata_id": "Q500416"
              },
              "region": {
                "mapbox_id": "dXJuOm1ieHBsYzpBYVRz",
                "name": "New York",
                "wikidata_id": "Q1384",
                "region_code": "NY",
                "region_code_full": "US-NY"
              },
              "country": {
                "mapbox_id": "dXJuOm1ieHBsYzpJdXc",
                "name": "United States",
                "wikidata_id": "Q30",
                "country_code": "US",
                "country_code_alpha_3": "USA"
              }
            }
          }
        }
      ],
      "attribution": "NOTICE: © 2023 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
    }
  ]
}
Geocoding response object
The response to a Geocoding API request is an object that contains the following properties:

Property	Type	Description
type	string	"FeatureCollection", a GeoJSON type from the GeoJSON specification.
features	array	An array of feature objects.
Forward geocodes: Returned features are ordered by relevance.
Reverse geocodes: Returned features are ordered by index hierarchy, from most specific features to least specific features that overlap the queried coordinates.

Read the Search result prioritization guide to learn more about how returned features are organized in the Geocoding API response.
attribution	string	Attributes the results of the Mapbox Geocoding API to Mapbox.
The data powering the Mapbox Geocoding API is constantly being updated and improved. This means that the values of properties in the response object are not guaranteed and may change within the same version of the API. Properties may be added to, but will not be removed from, the response within the same API version.

Each feature object in the features array may have the properties described below:

Property	Type	Description
id	string	Feature id. This property is named "id" to conform to the GeoJSON specification, but is the same id referred to as mapbox_id elsewhere in the response.
type	string	"Feature", a GeoJSON type from the GeoJSON specification.
geometry	object	An object describing the spatial geometry of the returned feature.
geometry.type	string	"Point", a GeoJSON type from the GeoJSON specification.
geometry.coordinates	array	An array in the format [longitude,latitude] at the center of the specified bbox.
properties	object	An object containing the resulting feature's details.
Each properties object in a feature may have the attributes described below:

Property	Type	Description
mapbox_id	string	Feature id. The mapbox_id uniquely identifies a place in the Mapbox search database. Mapbox ID’s are accepted in requests to the Geocoding API as a forward search, and will return the feature corresponding to that id.
feature_type	string	A string describing the type of the feature. Options are country, region, postcode, district, place, locality, neighborhood, street, address.
Formerly place_type in v5.
name	string	Formatted string of address_number and street.
name_preferred	string	The canonical or otherwise more common alias for the feature name. For example, searching for "America" will return "America" as the name, and "United States" as name_preferred.
place_formatted	string	Formatted string of result context: place region country postcode. The part of the result which comes after name.
full_address	string	Full formatted string of the feature, combining name_preferred and place_formatted.
context	object	A context object is an object representing the hierarchy of encompassing parent features. This may include a sub-object for any of the following properties: country, region, postcode, district, place, locality, neighborhood, street.
Which sub-objects are included is dependent upon the data coverage available and applicable to a given country or area.
coordinates	object	An object representing the geographical position and accuracy of the feature any routable points.
coordinates.longitude	number	Longitude of result
coordinates.latitude	number	Latitude of result
coordinates.accuracy	string	Accuracy metric for a returned address-type result. See Point accuracy for address features below.
coordinates.routable_points	array	An array of routable point objects for an address feature, each including name, longitude, and latitude properties.
bbox	array	The bounding box of the feature as an array of [minLon,minLat,maxLon,maxLat]. This property is only provided with features of type country, region, postcode, district, place, locality, or neighborhood.
match_code	object	Additional metadata indicating how the result components match to the input query. See Smart Address Match below.
The Context Object
The context object within properties is a powerful piece of data which breaks out the complete geographical hierarchy for a given address or place. It is both a reliable way to access the named values of each component part of an address, plus contains feature-specific data such as the Wikidata id and 3-letter alpha country code.

Each sub-object in the context always has a mapbox_id and name associated with it. The id can be queried directly via a forward geocoding search to traverse into a different geographical layer. Address features will also include an address sub-object, which additionally contains street_name and address_number properties.

A secondary_address feature will also have a matching sub-object in the context:

{
  "secondary_address": {
    "mapbox_id": "dXJuOm1ieGFkci11bml0OjdkZTE3MmUxLTJiMjktNDU1Mi1iNGQzLTkwN2JjMGZmOGQ1NDoyMDE",
    "name": "UNIT 201",
    "designator": "UNIT",
    "identifier": "201",
    "extrapolated": true // Indicates that the unit number is not known in our data, but the primary address is known to have secondary addresses associated with it
  },
  ...
}
Example Context Object
The following is an example of the context object returned for the address 2595 Lucky John Drive, Park City, Utah 84060, United States:

"context": {
    "address": {
        "mapbox_id": "dXJuOm1ieGFkcjozOGY3OTg1OC1jNzY0LTQ4ZGUtYTFmMC04NjJjOTM1ZWViMjc",
        "address_number": "2595",
        "street_name": "Lucky John Drive",
        "name": "2595 Lucky John Drive"
    },
    "street": {
        "mapbox_id": "dXJuOm1ieGFkcjozOGY3OTg1OC1jNzY0LTQ4ZGUtYTFmMC04NjJjOTM1ZWViMjc",
        "name": "Lucky John Drive"
    },
    "neighborhood": {
        "mapbox_id": "dXJuOm1ieHBsYzpITktzN0E",
        "name": "Park Meadows"
    },
    "postcode": {
        "mapbox_id": "dXJuOm1ieHBsYzpFUjNPN0E",
        "name": "84060"
    },
    "place": {
        "mapbox_id": "dXJuOm1ieHBsYzpEdjlvN0E",
        "name": "Park City",
        "wikidata_id": "Q482993"
    },
    "district": {
        "mapbox_id": "dXJuOm1ieHBsYzpBVlRHN0E",
        "name": "Summit County",
        "wikidata_id": "Q484563"
    },
    "region": {
        "mapbox_id": "dXJuOm1ieHBsYzpCa1Rz",
        "name": "Utah",
        "wikidata_id": "Q829",
        "region_code": "UT",
        "region_code_full": "US-UT"
    },
    "country": {
        "mapbox_id": "dXJuOm1ieHBsYzpJdXc",
        "name": "United States",
        "wikidata_id": "Q30",
        "country_code": "US",
        "country_code_alpha_3": "USA"
    }
}
Translations
When providing more than one language in the context object for the country, region, district, place, neighborhood properties will appear the translations property. This is an object where the key is the language code and the value is an object with language and name properties.

Translations Example
Example of the context object when passing the parameter language=en,es.

{
  "context": {
    "address": {
      "mapbox_id": "dXJuOm1ieGFkcjowYzNhM2QzZi03ODIyLTQ3YzItODRlNC04YzA3ZDIxMTE2MmE",
      "address_number": "100",
      "street_name": "Jefferson Street Northwest",
      "name": "100 Jefferson Street Northwest"
    },
    "street": {
      "mapbox_id": "dXJuOm1ieGFkcjowYzNhM2QzZi03ODIyLTQ3YzItODRlNC04YzA3ZDIxMTE2MmE",
      "name": "Jefferson Street Northwest"
    },
    "neighborhood": {
      "mapbox_id": "dXJuOm1ieHBsYzpCQTRzN0E",
      "name": "Brightwood Park",
      "translations": {
        "en": {
          "language": "en",
          "name": "Brightwood Park"
        },
        "es": {
          "language": "es",
          "name": "Brightwood Park"
        }
      }
    },
    "postcode": {
      "mapbox_id": "dXJuOm1ieHBsYzpBNSt1N0E",
      "name": "20011"
    },
    "place": {
      "mapbox_id": "dXJuOm1ieHBsYzpGSmlvN0E",
      "name": "Washington",
      "wikidata_id": "Q61",
      "translations": {
        "en": {
          "language": "en",
          "name": "Washington"
        },
        "es": {
          "language": "es",
          "name": "Washington"
        }
      }
    },
    "region": {
      "mapbox_id": "dXJuOm1ieHBsYzpCUVRz",
      "name": "District of Columbia",
      "wikidata_id": "Q3551781",
      "region_code": "DC",
      "region_code_full": "US-DC",
      "translations": {
        "en": {
          "language": "en",
          "name": "District of Columbia"
        },
        "es": {
          "language": "es",
          "name": "Distrito de Columbia"
        }
      }
    },
    "country": {
      "mapbox_id": "dXJuOm1ieHBsYzpJdXc",
      "name": "United States",
      "wikidata_id": "Q30",
      "country_code": "US",
      "country_code_alpha_3": "USA",
      "translations": {
        "en": {
          "language": "en",
          "name": "United States"
        },
        "es": {
          "language": "es",
          "name": "Estados Unidos"
        }
      }
    }
  }
}
Point accuracy for address features
The coordinates.accuracy property in a Geocoding response object is a point accuracy metric for the returned address feature. This list is subject to change.

Accuracy	Description
rooftop	Result intersects a known building/entrance.
parcel	Result is associated with one or more address within a specified polygonal boundary
point	Result is a known address point but does not intersect a known rooftop/parcel.
interpolated	Result position and existence are estimated based on nearby known addresses.
approximate	Result position is approximated by a 9-digit zipcode centroid.
intersection	For street type features only. The result is an intersection of 2 streets.
Smart Address Match
New in v6
The match_code object in the Geocoding API helps you understand how the resulting address feature aligns with the query submitted. Available only for address-type features, the match_code provides a breakdown of how each element of the result matches with the query, plus a confidence score, based on how well it matches. This can help you make decisions about what results to keep or throw out based on your application's tolerance for fuzzy matching on the query.

Smart Address Match is available for all forward geocoding requests that return an address type feature. It works best when using Structured Input forward queries, as the request components must be typed explicitly.

Confidence Score	Description
exact	No components are unmatched (up to 2 may be inferred) and no there are no extraneous query tokens.
high	One component (excluding house_number or region) may have been corrected. Additionally, if only house_number, street, and postcode are provided and match, high confidence is returned.
medium	Two components (excluding house_number or region) may have changed. Allows for minor misspellings. If house_number, street, place, and postcode are matched the region may be corrected.
low	house_number, region, or more than 2 other components have been corrected.
Match Code	Description
matched	The component value matches the user's input.
unmatched	The component value doesn't match the user's input, or the user didn't submit this component type as part of the query.
not_applicable	The component is not used in the postal address string for example locality.
inferred	The component type wasn't submitted as part of the query, but we were able to confidently fill in the value. only returned for the country component.
plausible	Only relevant for the address_number and secondary_address components. In the case of address_number, this means the address accuracy is interpolated. In the case of secondary_address, this means the secondary address was extrapolated, i.e. the primary address is known to have secondary addresses, but the geocoding service did not find a specific matching secondary address in our data.
Example match_code
This forward geocoding request with structured input includes a valid street address in Park City Utah, USA.

https://api.mapbox.com/search/geocode/v6/forward?&address_number=2595&street=lucky john dr&place=park city&region=CO

Note that the region parameter value is CO, and will yield an unmatched status in the match_code in the resulting feature's properties as the matched address is not in the US state of Colorado.

{
  "name": "2595 Lucky John Drive",
  "place_formatted": "Park City, Utah 84060, United States",
  "match_code": {
    "address_number": "matched",
    "street": "matched",
    "postcode": "unmatched",
    "place": "matched",
    "region": "unmatched",
    "locality": "not_applicable",
    "country": "inferred",
    "confidence": "medium"
  }
}
Example response: Forward geocoding
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "dXJuOm1ieGFkcjo5ZDQzNzM1Mi0xZGZiLTRkNTItYWMxNC01MzllZjY5ODIwMmI",
      "geometry": {
        "type": "Point",
        "coordinates": [-111.86313, 40.725163]
      },
      "properties": {
        "mapbox_id": "dXJuOm1ieGFkcjo5ZDQzNzM1Mi0xZGZiLTRkNTItYWMxNC01MzllZjY5ODIwMmI",
        "feature_type": "address",
        "name": "974 2100 South",
        "coordinates": {
          "longitude": -111.86313,
          "latitude": 40.725163,
          "accuracy": "rooftop"
        },
        "place_formatted": "Salt Lake City, Utah 84106, United States",
        "match_code": {
          "address_number": "matched",
          "street": "matched",
          "postcode": "unmatched",
          "place": "unmatched",
          "region": "unmatched",
          "locality": "not_applicable",
          "country": "inferred",
          "confidence": "low"
        },
        "context": {
          "address": {
            "mapbox_id": "dXJuOm1ieGFkcjo5ZDQzNzM1Mi0xZGZiLTRkNTItYWMxNC01MzllZjY5ODIwMmI",
            "address_number": "974",
            "street_name": "2100 South",
            "name": "974 2100 South"
          },
          "street": {
            "mapbox_id": "dXJuOm1ieGFkcjo5ZDQzNzM1Mi0xZGZiLTRkNTItYWMxNC01MzllZjY5ODIwMmI",
            "name": "2100 South"
          },
          "neighborhood": {
            "mapbox_id": "dXJuOm1ieHBsYzpERWdNN0E",
            "name": "Fairmont",
            "alternate": {
              "mapbox_id": "dXJuOm1ieHBsYzpLMmRzN0E",
              "name": "Winfield"
            }
          },
          "postcode": {
            "mapbox_id": "dXJuOm1ieHBsYzpFU011N0E",
            "name": "84106"
          },
          "place": {
            "mapbox_id": "dXJuOm1ieHBsYzpFVmhvN0E",
            "name": "Salt Lake City",
            "wikidata_id": "Q23337",
            "alternate": {
              "mapbox_id": "dXJuOm1ieHBsYzpETE5vN0E",
              "name": "Millcreek"
            }
          },
          "district": {
            "mapbox_id": "dXJuOm1ieHBsYzpBVGdtN0E",
            "name": "Salt Lake County",
            "wikidata_id": "Q484556"
          },
          "region": {
            "mapbox_id": "dXJuOm1ieHBsYzpCa1Rz",
            "name": "Utah",
            "wikidata_id": "Q829",
            "region_code": "UT",
            "region_code_full": "US-UT"
          },
          "country": {
            "mapbox_id": "dXJuOm1ieHBsYzpJdXc",
            "name": "United States",
            "wikidata_id": "Q30",
            "country_code": "US",
            "country_code_alpha_3": "USA"
          }
        }
      }
    },
    {
      "type": "Feature",
      "id": "dXJuOm1ieGFkcjpkNjZkM2M0Zi1hNTA0LTQ3NTQtYTZjMS1iNjYwMGU2NWY4NmI",
      "geometry": {
        "type": "Point",
        "coordinates": [-111.919654, 40.725872]
      },
      "properties": {
        "mapbox_id": "dXJuOm1ieGFkcjpkNjZkM2M0Zi1hNTA0LTQ3NTQtYTZjMS1iNjYwMGU2NWY4NmI",
        "feature_type": "address",
        "name": "974 2100 South",
        "coordinates": {
          "longitude": -111.919654,
          "latitude": 40.725872,
          "accuracy": "interpolated"
        },
        "place_formatted": "South Salt Lake, Utah 84119, United States",
        "match_code": {
          "address_number": "plausible",
          "street": "matched",
          "postcode": "unmatched",
          "place": "unmatched",
          "region": "unmatched",
          "locality": "not_applicable",
          "country": "inferred",
          "confidence": "low"
        },
        "context": {
          "address": {
            "mapbox_id": "dXJuOm1ieGFkcjpkNjZkM2M0Zi1hNTA0LTQ3NTQtYTZjMS1iNjYwMGU2NWY4NmI",
            "address_number": "974",
            "street_name": "2100 South",
            "name": "974 2100 South"
          },
          "street": {
            "mapbox_id": "dXJuOm1ieGFkcjpkNjZkM2M0Zi1hNTA0LTQ3NTQtYTZjMS1iNjYwMGU2NWY4NmI",
            "name": "2100 South"
          },
          "neighborhood": {
            "mapbox_id": "dXJuOm1ieHBsYzpCVG5NN0E",
            "name": "Cannon",
            "alternate": {
              "mapbox_id": "dXJuOm1ieHBsYzpGYU5zN0E",
              "name": "Lincoln Park"
            }
          },
          "postcode": {
            "mapbox_id": "dXJuOm1ieHBsYzpFU1RPN0E",
            "name": "84119"
          },
          "place": {
            "mapbox_id": "dXJuOm1ieHBsYzpFbStJN0E",
            "name": "South Salt Lake",
            "alternate": {
              "mapbox_id": "dXJuOm1ieHBsYzpFMHRJN0E",
              "name": "Taylorsville"
            }
          },
          "district": {
            "mapbox_id": "dXJuOm1ieHBsYzpBVGdtN0E",
            "name": "Salt Lake County",
            "wikidata_id": "Q484556"
          },
          "region": {
            "mapbox_id": "dXJuOm1ieHBsYzpCa1Rz",
            "name": "Utah",
            "wikidata_id": "Q829",
            "region_code": "UT",
            "region_code_full": "US-UT"
          },
          "country": {
            "mapbox_id": "dXJuOm1ieHBsYzpJdXc",
            "name": "United States",
            "wikidata_id": "Q30",
            "country_code": "US",
            "country_code_alpha_3": "USA"
          }
        }
      }
    }
  ],
  "attribution": "NOTICE: © 2023 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
}