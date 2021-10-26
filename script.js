
$('#ta').val(`var t = new SimpleTester();

t.addTest('isEven','Checks if X is even',(p)=>{
    return p.x % 2==0;
});
t.addTest('isOdd','Checks if X is odd',(p)=>{return p.x % 2==1});

t.run('isEven',{x:6});
t.run('isEven',{x:7});
t.run('isEven',{x:8});
t.run('isOdd',{x:6});
t.run('isOdd',{x:7});
t.run('isOdd',{x:8});

t.viewLog()`)

$('#ta').css({'background-color':'black','color':'rgb(82, 209, 82)','height':'25em','width':'40em','padding':'1em','border-radius':'1em'})

$('#run').click(()=>{
    run()
})


function run() {
    var el = document.getElementById('ta');
    var scriptText = el.value;
    var oldScript = document.getElementById('scriptContainer');
    var newScript;

    if (oldScript) {
      oldScript.parentNode.removeChild(oldScript);
    }

    newScript = document.createElement('script');
    newScript.id = 'scriptContainer';
    newScript.text = el.value;
    document.body.appendChild(newScript);
} 

/*
var t = new SimpleTester();

t.addTest('isEven','Checks if X is even',(p)=>{
    return p.x % 2==0;
})

t.run('isEven',{x:6});

t.viewLog()
*/