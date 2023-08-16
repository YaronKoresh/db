
# DB.js

* Manage your Database inside text files - without SQL

* Results are sorted, from the most recent data, to the most early data created

### First, you need to create an environment variable called "DB" with the path to the database folder. You can use [DotEnv](https://npmjs.com/package/dotenv) for that

# Example

```
// Load environment variables

import "dotenv/config" // or: require('dotenv').config();

// Require/Import this package

import "@yaronkoresh/db" // or: require("@yaronkoresh/db");

// Now you have a new global async function, called: "Database"
```

---

This "Database" global async function, has the spesific syntax, of: `action` & `parameter(s)`;

We have 5 actions:

# Set:

* Adds data to one of the database sub-folders.

* Sub-folder could be any "type" you want to specify: "account"/"product"/"game".

* The data need to be an Object `{ key: value }`.

* The keys of the data, are the properties of what you want to insert.

* With any data you want to insert, please insert a property (maybe call it "id"?) that its value is unique, to that specific item, in its sub-folder.

* The unique identifier will let you add that item again, with the same "unique identifier" but other properties could be different.

* You will be able to get the latest version only - with the action called `Latest` (you will read about it, too).

* Sometimes, we want to flag a product as "off", or account as "temporary blocked", so:

* * I recommended to use a "status" property, then, you can add the same data again, but just flip its flag (and get the latest version using "Latest").

* An example: `await Database( "Set", "product", { id: "BestMarket-1354d987h3287dh", status: "on", taste: "very tasty!", price: "very cheap!" } )`.

# Get:

* Get all data of a specific sub-folder, including replaced data (good for searching edits history).

* History, is data that was added again, with the same "key identifier" (an example: "id" property/key).

* The data could be filtered with an object like so: `{ property1: value1, property2: value2 }`.

* The data could be limited with a maximum number of days to go back in time, eg. 30 (return just items created in the last 30 days).

* When setting the filter to `{}` - that filter have no effect (default).

* When setting days limiter to null - that limiter is disabled (default).

* An example: `await Database( "Get", "product", { status: "on", price: "very cheap!" } , 7 )`.

# Latest:

* Just like `Get`, but it some changes:

* * Give only the latest version for each item (you can change the name of identifier property, fron "id" to something else).

* * You can choose one sub-folder, an array of sub-folders, or "*" (default) which means - all sub-folders.

* * It have an forth optional parameter, which define the name of the key, that holds the unique identifiers.

* An example: `await Database( "Latest", "*", {}, null, "id" )`, which is equal to: `await Database( "Latest" )`.

# ForceHistoryCleanUp:

* Sometimes we really need to remove unused history (do it when on maintenance mode, so no one read from the database that moment!).

* For that, put your server on maintenance mode, to restrict access, then use that action with two parameters:

* * the first requires parameter: the sub-folder to clean-up.

* * the second optional parameter: the name of the key, that holds the unique identifiers.

* An example: `await Database( "ForceHistoryCleanUp", "product" )`.

# ForceHistoryCleanUpForEach:

* Do a history clean up for all of out sub-folders! (all the database actually...).

* For that, put your server on maintenance mode, to restrict access, then use that action with one optional parameters:

* * the only optional parameter: the name of the key, that holds the unique identifiers.

* An example: `await Database( "ForceHistoryCleanUpForEach" )`.

### Enjoy!
