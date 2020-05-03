var t = new SimpleTester();

t.addTest('isEven','Checks if X is even',(p)=>{
    return p.x % 2==0;
})

t.run('isEven',{x:6});

t.viewLog()