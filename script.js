var t = new SimpleTester();

t.addTest('isEven',(p)=>{
    return p.x % 2==0;
},des='Checks if X is even')

t.run('isEven',{x:6});

t.viewLog()