class SimpleTester {
    constructor() {
      this.tests = {};
      this.defaultLog = {
        passed: 0,
        failed: 0,
        tested: 0,
        failedTests: {},
        passedTests: {},
        testedTests:{},
        timings: {}
      };
      this.log = this.defaultLog;
      this.timers = {};
    }
    addTest(testName, func) {
      this.tests[testName] = func;
    }
    run(testName, params) {
      if (!this.tests[testName]) return null;
      var result = this.tests[testName](params);
      this.updateLog(testName, params, result);
      return result;
    }
    updateLog(testName, params, result) {
      this.log.tested += 1;
      if (result) {
        this.log.passed += 1;
        if (!this.log.passedTests[testName])
          this.log.passedTests[testName] = [params];
        else this.log.passedTests[testName].push(params);
      } else {
        this.log.failed += 1;
        if (!this.log.failedTests[testName])
          this.log.failedTests[testName] = [params];
        else this.log.failedTests[testName].push(params);
      }
      if(!this.log.testedTests[testName])
        this.log.testedTests[testName] = [params];
      else
        this.log.testedTests[testName].push(params);
    }
    clearLog() {
      this.log = this.defaultLog;
    }

    viewLog() {
      var view = $(document.createElement("div"));
    
     view.attr('id', 'logWindow');
      view.css({
          "minHeight":"100vh",
          "width":"100vw",
          "position":"absolute",
          "left":"0px",
          "top":"0px",
          "background-color":"#777799"
      })
  
      view.html(JSON.stringify(this.log));
      view.html(`
        <h1 style='color:#222222;width:100%;background-color:#9999bb;padding:1%;font-size:2.5em;font-family:Arial, Helvetica, sans-serif'>Test Report</h1>
        <h2 id='simpleTesterPassedHeader' class='simpleTesterh2' style='color:#22ff22;' >Passed: ${this.log['passed']} </h2>
        <div id='simpleTesterDrawer1' class ='simpleTesterDrawer'>
        `+  Object.keys(t.log.passedTests).map((x)=>{
          return "<span title='See Parameters' class='simpleTesterTest'>["+ t.log.passedTests[x].length +"]" + x + "</span><br>"
          }).join("\n")      +`
        </div>
        <h2 id='simpleTesterFailedHeader' class='simpleTesterh2' style='color:#cc0000;' >Failed: ${this.log['failed']} </h2>
        <div id='simpleTesterDrawer2' class ='simpleTesterDrawer'>
        `+  Object.keys(t.log.failedTests).map((x)=>{
          return "<span title='See Parameters' class='simpleTesterTest'>["+ t.log.failedTests[x].length +"]" + x + "</span><br>"
          }).join("\n")      +`
        </div>
        <h2 id='simpleTesterTestedHeader' class='simpleTesterh2' style='color:white' >Tested: ${this.log['tested']} </h2>
        <div id='simpleTesterDrawer3' class ='simpleTesterDrawer'>
        `+  Object.keys(t.log.testedTests).map((x)=>{
          return "<span title='See Parameters' class='simpleTesterTest'>["+ t.log.testedTests[x].length +"]" + x + "</span><br>"
          }).join("\n")      +`
        </div>
        <hr style='width:90%'/>
        `);



      var butt = $(document.createElement("button"));
      butt.css("margin-bottom","1.5em")
      butt.text("Close Window");
      butt.click(e => {
        view.remove();
      });
      view.append(butt);
      $(document.body).append(view);

      $('.simpleTesterTest').on('mouseenter',(e)=>$(e.target).css('font-weight','bold'))
      $('.simpleTesterTest').on('mouseleave',(e)=>$(e.target).css('font-weight','normal'))

      $('.simpleTesterh2').css({
        textAlign: 'center',
        marginBottom:'0px',
        width: "12em",
        backgroundColor: "black",
        borderRadius: "10px",
        border:"1px solid black",
        fontSize:" 2em",
        marginLeft:" 5%",
        fontFamily: '"Arial Black", Gadget, sans-serif'

      })
      $('.simpleTesterDrawer').css( { 
      backgroundColor: 'rgb(153, 153, 187)',
      color: 'rgb(34, 34, 34)',
      marginLeft: '5%',
      borderRadius: '10px',
      width: '80%',
      padding: '2% 2% 2% 5%',
      fontSize: '1.75em',
      display:'none'
    })
      

      $('#simpleTesterPassedHeader').click(()=>{$('#simpleTesterDrawer1').slideToggle(250)});
      $('#simpleTesterFailedHeader').click(()=>{$('#simpleTesterDrawer2').slideToggle(250)});
      $('#simpleTesterTestedHeader').click(()=>{$('#simpleTesterDrawer3').slideToggle(250)});
    }
    

    time(timerName)
    {
        if (!this.timers[timerName])
        {
            this.timers[timerName] = performance.now();
            return null;
        }
        var t0 = this.timers[timerName];

        delete this.timers[timerName];

        var time = performance.now()-t0; 

        this.log.timings[timerName] = time;

        return time;      
    }
  }
  