# SimpleTester.js

## Installation

Copy SimpleTester.js to your project directory.
Include in header of html
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src='SimpleTester.js'></script>
```

## Usage
```javascript
var tester = new SimpleTester();

//Create a test
tester.addTest('isEven','Checks if X is even',(p)=>{
    return p.x % 2==0;
})


//Run a test
tester.run('isEven',{x:6});

//Open test report Windows
tester.viewLog();

```
