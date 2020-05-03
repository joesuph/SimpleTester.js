# SimpleTester.js

## About
A class allows for easy test-driven development in the browser

Recommended Workflow:
1. Create an instance of SimpleTester with the desired config arguments
2. Create tests
3. Run Tests
4. Write code to satisfy tests
5. View Test Report to verify the success
6. Repeat 2-5 until project is complete

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
> See wiki for more documentation
