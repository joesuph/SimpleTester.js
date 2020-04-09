class SimpleTester {
    constructor() {
      this.tests = {};
      this.defaultLog = {
        passed: 0,
        failed: 0,
        tested: 0,
        failedTests: {},
        passedTests: {}
      };
      this.log = this.defaultLog;
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
      var view = document.createElement("div");
  
      view.style.height = "100vh";
      view.style.width = "100vw";
      view.style.position = "absolute";
      view.style.left = "0px";
      view.style.top = "0px";
      view.style.backgroundColor = "#777799";
  
      view.innerHTML = JSON.stringify(this.log);
      var butt = document.createElement("button");
      butt.innerText = "Close Window";
      butt.addEventListener("click", e => {
        document.body.removeChild(view);
      });
      view.appendChild(butt);
      document.body.appendChild(view);
    }
  }
  