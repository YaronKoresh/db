# @yaronkoresh/db: Manage your Database inside text files - without SQL.

## What it does?

* Manage your Database inside text files - without SQL.

* Results are sorted, from the most recent data, to the most early data created.

* Have a built-in function for history clean-up.

- - -

## How it works?

1. Read the path to the db folder, using a global called db.

2. Write/Read data from the database.

3. When writing, ensure the category folder exists, then add folder named as the current timestamp, with file (named as the key) for each value.

4. When reading, get the category content, filter timestamps & key-values pairs.

5. The package could also clean-up the history from when database, when needed, using `ForceHistoryCleanUp` or `ForceHistoryCleanUpForEach`.

- - -

## Using "Set":

* Purpose: Adds data to one of the database categories.

* Parameters:

* * Category: the name of the category that will get the new data (required).

* * Data: an object contains the key-value data (required).

* Examples:

* * `Set( "product", { status: "on", id: "some-random-characters", price: 10.90, title: "My new product" } )` .

- - -

## Using "Get":

* Purpose: Get all data of a specific sub-folder, including replaced data (good for searching history).

* Parameters:

* * Category: the name of the category containing the data (required).

* * Filters: an object contains the key-value filters (default = {}).

* * Days: The maximum number of days to go back in time, null means "disabled" (default = null).

* Examples:

* * `Get( "product", { status: "on", id: "some-random-characters" }, 7 )` , which returns versions of products, including history, sorted from recent to early, created within the last week.

- - -

## Using "Latest":

* Purpose: Give only the latest version for each item, using an "identifier key" to seperate different items within the same category.

* Parameters:

* * Categories: an name of category, an array of names, or even "*", which means, all categories (default = "*").

* * Filters: an object contains the key-value filters (default = {}).

* * Days: The maximum number of days to go back in time, null means "disabled" (default = null).

* * IdentifierKey: the key selected to seperate different items within the same category (default = "id").

* Examples:

* * `Latest( "product", {}, 30 )` , which returns the latest versions of products, which got an update within the last month.

- - -

## Using "ForceHistoryCleanUp":

* Purpose: Remove unused history, from one category (do it when on maintenance mode, so no one read from the database in that moment).

* Parameters:

* * Category: the category to clean from history (required).

* * IdentifierKey: the key selected to seperate different items within the selected category (default = "id").

* Examples:

* * `ForceHistoryCleanUp( "product" )` .

* * `ForceHistoryCleanUp( "product", "A-Custom-Products-Seperation-Key" )` .

- - -

## Using "ForceHistoryCleanUpForEach":

* Purpose: Remove unused history, from all categories (do it when on maintenance mode, so no one read from the database in that moment).

* Parameters:

* * IdentifierKey: the key selected to seperate different items within each category (default = "id").

* Examples:

* * `ForceHistoryCleanUp( )` .

* * `ForceHistoryCleanUp( "A-Custom-Products-Seperation-Key" )` .

- - -

## License:

### This project is licensed under the MIT open-source license.