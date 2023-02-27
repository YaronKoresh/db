
# DB.js

Manage your Database inside text files - without SQL

# Example

```
var DB = require("./DB.js");
var searchFrom = "Feb 23 2020 20:11:57 GMT+0200";
var filter1 = { a:"a" , b:"b" , c:"c" };
var filter2 = { c:"c" };
var filter3 = { };

// Current time: "Feb 23 2020 20:11:57 GMT+0200"
DB.SET( "ACCOUNTS" , { a:"a" , b:"b" , c:"c"  } );
DB.SET( "ACCOUNTS" , { c:"c" , d:"d" , e:"e"  } );
DB.SET( "ACCOUNTS" , { a:"xyz" , b:"xyz" , c:"xyz" } );

var a = DB.GET( "ACCOUNTS" , searchFrom , filter1 );
var b = DB.GET( "ACCOUNTS" , searchFrom , filter2 );
var c = DB.GET( "ACCOUNTS" , searchFrom , filter3 );

console.log( a.data );
// [ { a:"a" , b:"b" , c:"c"  } ]

console.log( b.data );
// [ { a:"a" , b:"b" , c:"c"  } , { c:"c" , d:"d" , e:"e"  } ]

console.log( c.data );
// [ { a:"a" , b:"b" , c:"c"  } , { c:"c" , d:"d" , e:"e"  } , { a:"xyz" , b:"xyz" , c:"xyz" } ]
```

### Enjoy!
