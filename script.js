
$('#ta').val(`var t = new SimpleTester();

t.addTest('isEven','Checks if X is even',(p)=>{
    return p.x % 2==0;
});

t.run('isEven',{x:6});

t.viewLog()`)

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