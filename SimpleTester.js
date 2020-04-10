class SimpleTester {
    constructor() {
      this.tests = {};
      this.defaultLog = {
        passed: 0,
        failed: 0,
        tested: 0,
        failedTests: {},
        passedTests: {},
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
    }
    clearLog() {
      this.log = this.defaultLog;
    }

    viewLog() {
      var view = $(document.createElement("div"));
    

      view.css({
          "height":"100vh",
          "width":"100vw",
          "position":"absolute",
          "left":"0px",
          "top":"0px",
          "background-color":"#777799"
      })
  
      view.html(JSON.stringify(this.log));
      view.html(`
        <h1 style='color:#222222;width:100%;background-color:#9999bb;padding:1%;font-size:2.5em;font-family:Arial, Helvetica, sans-serif'>Test Report</h1>
        <h2 style='text-align: center;width: 12em;background-color: black;border-radius: 10px;border:1px solid black;color:#22ff22;font-size: 2em;margin-left: 5%;font-family: "Arial Black", Gadget, sans-serif;'>Passed: ${this.log['passed']} <h2>
        <h2 style='text-align: center;width: 12em;background-color: black;border-radius: 10px;border:1px solid black;color:#cc0000;font-size: 2em;margin-left: 5%;font-family: "Arial Black", Gadget, sans-serif;'>Failed: ${this.log['failed']} <h2>
        <h2 style='color:#ffffff;text-align: center;width: 12em;background-color: black;border-radius: 10px;border:1px solid black;font-size: 2em;margin-left: 5%;font-family: "Arial Black", Gadget, sans-serif;'>Tested: ${this.log['tested']} <h2>
        `);
     $(document.createElement('h1')).text("Log")

      var butt = $(document.createElement("button"));
      butt.text("Close Window");
      butt.click(e => {
        view.remove();
      });
      view.append(butt);
      $(document.body).append(view);
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
  