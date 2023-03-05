
# DB.js

Manage your Database inside text files - without SQL

# Example

```
var db = require("@yaronkoresh/db");
var searchFrom = "Feb 1 1970 15:00:00 GMT+2";
var filter1 = { a:"a" , b:"b" , c:"c" };
var filter2 = { c:"c" };
var filter3 = { };

// Current time: 'Mon, 27 Feb 2023 21:08:31 GMT+2'
db.Set( "Accounts" , { a:"a" , b:"b" , c:"c"  } );
db.Set( "Accounts" , { c:"c" , d:"d" , e:"e"  } );
db.Set( "Accounts" , { a:"xyz" , b:"xyz" , c:"xyz" } );

var a = db.Get( "Accounts" , searchFrom , filter1 );
var b = db.Get( "Accounts" , searchFrom , filter2 );
var c = db.Get( "Accounts" , searchFrom , filter3 );

console.log( a );
console.log( b );
console.log( c );

/*
[
  {
    time: 'Mon, 27 Feb 2023 19:08:31 GMT',
    data: { a: 'a', b: 'b', c: 'c' }
  }
]
[
  {
    time: 'Mon, 27 Feb 2023 19:08:31 GMT',
    data: { c: 'c', d: 'd', e: 'e' }
  },
  {
    time: 'Mon, 27 Feb 2023 19:08:31 GMT',
    data: { a: 'a', b: 'b', c: 'c' }
  }
]
[
  {
    time: 'Mon, 27 Feb 2023 19:08:33 GMT',
    data: { a: 'xyz', b: 'xyz', c: 'xyz' }
  },
  {
    time: 'Mon, 27 Feb 2023 19:08:31 GMT',
    data: { c: 'c', d: 'd', e: 'e' }
  },
  {
    time: 'Mon, 27 Feb 2023 19:08:31 GMT',
    data: { a: 'a', b: 'b', c: 'c' }
  }
]
*/

```

### Enjoy!
