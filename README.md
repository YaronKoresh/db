
# DB.js

* Manage your Database inside text files - without SQL

* Results are sorted, from the most recent data, to the most early data created

## First, you need to create an environment variable called "DB" with the path to the database folder, you can use [DotEnv](https://npmjs.com/package/dotenv) for that

# Example

```
// Load environment variables
require('dotenv').config();

// Require this package
const { Set, Get } = require("@yaronkoresh/db");

// Current time: 'Mon, 27 Feb 2023 21:08:31 GMT+2'
Set( "Accounts", {
	id: "G584",
	full_name: "Yaron Koresh",
	phone: "+972501234567"
});

// Let's say the creation times are equal, just for the example!

// Current time: 'Mon, 27 Feb 2023 21:08:31 GMT+2'
Set( "Accounts", {
	id: "Q842",
	full_name: "Bezalel Koresh",
	phone: "+972507654321"
});

// Now, let's query!

// Search a one year back in time:
// This parameter is optional! if unspecified, query your data from the last ice age ;^)
const daysToSearchFromNow = 365; 

// Search only the data with this Id AND this full_name:
// This parameter is optional! if unspecified, query without limiting a specific values
const filters = {
	id: "Q842",
	full_name: "Bezalel Koresh"
};

const filtered = Get( "Accounts" , daysToSearchFromNow , filters );
const unfiltered = Get( "Accounts" );

// query less results with filters:
console.log( filtered );

				/*
[
	{
		time: 'Mon, 27 Feb 2023 19:08:31 GMT',
		data: {
			id: "Q842",
			full_name: "Bezalel Koresh",
			phone: "+972507654321"
		}
	}
]
				*/

// query more results with no filters:
console.log( unfiltered );


				/*
[
	{
		time: 'Mon, 27 Feb 2023 19:08:31 GMT',
		data: {
			id: "Q842",
			full_name: "Bezalel Koresh",
			phone: "+972507654321"
		}
	}, {
		time: 'Mon, 27 Feb 2023 19:08:31 GMT',
		data: {
			id: "G584",
			full_name: "Yaron Koresh",
			phone: "+972501234567"
		}
	}
]
				*/

```

### Enjoy!
