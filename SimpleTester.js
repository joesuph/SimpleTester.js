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
      /*
      view.style.height = "100vh";
      view.style.width = "100vw";
      view.style.position = "absolute";
      view.style.left = "0px";
      view.style.top = "0px";
      view.style.backgroundColor = "#777799";
      */
  
      view.html(JSON.stringify(this.log));
      
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
  