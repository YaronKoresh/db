
# DB.js

Manage your Database inside text files - without SQL

# Example

```
var DB = require("./DB.js");
var searchFrom = "Feb 1 1970 15:00:00 GMT+2";
var filter1 = { a:"a" , b:"b" , c:"c" };
var filter2 = { c:"c" };
var filter3 = { };

// Current time: 'Mon, 27 Feb 2023 21:08:31 GMT+2'
DB.SET( "ACCOUNTS" , { a:"a" , b:"b" , c:"c"  } );
DB.SET( "ACCOUNTS" , { c:"c" , d:"d" , e:"e"  } );
DB.SET( "ACCOUNTS" , { a:"xyz" , b:"xyz" , c:"xyz" } );

var a = DB.GET( "ACCOUNTS" , searchFrom , filter1 );
var b = DB.GET( "ACCOUNTS" , searchFrom , filter2 );
var c = DB.GET( "ACCOUNTS" , searchFrom , filter3 );

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
