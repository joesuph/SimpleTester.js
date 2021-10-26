/**
 * Todo:
 *  -Add UI Tests
 *  -Add UI Tests with screenshots to report
 *  -Make Test report tables dragable and resizable
 *  -Include Jquery In constructor
 *  -Disable tests when Log Report is open
 *  -Add config setting to tests
 */
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
    /**
     * Creates a test 
     * @param {string} testName Name of test.
     * @param {string} des Description of text.
     * @param {function} func Function takes single obj returns bool.
     */
    addTest(testName, des=null,func=null) {
      if (func==null){func=des;des="";}
      this.tests[testName] = {test:testName,des:des,run:func};
    }

    /**
     * Runs a premade test
     * @param {string} testName name of the test to be ran.
     * @param {object} params an object contain the required variables as member variables. 
     */
    run(testName, params) {
      if (!this.tests[testName]) return null;
      var t0 = performance.now();
      var result = this.tests[testName].run(params);
      var t1 = performance.now();
      this.updateLog(testName, params, result,t1-t0);
      return result;
    }

    /**
     * This will update the Test Report with results of caller test
     * @param {string} testName Name of the test.
     * @param {Object} params Object containing the params being used.
     * @param {boolean} result Boolean set to whether the ran test was a success.
     * @param {*} time time for the test to run.
     */
    updateLog(testName, params, result, time) {
      this.log.tested += 1;
      if (result) {
        this.log.passed += 1;
        if (!this.log.passedTests[testName])
          this.log.passedTests[testName] = [{params,time}];
        else this.log.passedTests[testName].push({params,time});
      } else {
        this.log.failed += 1;
        if (!this.log.failedTests[testName])
          this.log.failedTests[testName] = [{params,time}];
        else this.log.failedTests[testName].push({params,time});
      }
      if(!this.log.testedTests[testName])
        this.log.testedTests[testName] = [{time,params}];
      else
        this.log.testedTests[testName].push({time,params});
    }

    /**
     * Clears the log
     */
    clearLog() {
      this.log = this.defaultLog;
    }

    /**
     * Opens window of view report
     */
    viewLog() {
      var view = $(document.createElement("div"));
    
      view.attr('id', 'logWindow');
      view.css({
          "minHeight":"100vh",
          "minWidth":"100vw",
          "position":"absolute",
          "left":"0px",
          "top":"0px",
          "background-color":"#777799",
          "overflow":"hidden"
      })
  
      view.html(`
        <h1 style='color:#222222;width:100%;background-color:#9999bb;padding:1%;font-size:2.5em;font-family:Arial, Helvetica, sans-serif'>Test Report</h1>
        <h2 id='simpleTesterPassedHeader' class='simpleTesterh2' style='color:#22ff22;cursor:pointer' >Passed: ${this.log['passed']} </h2>
        <div id='simpleTesterDrawer1' class ='simpleTesterDrawer'>
        `+  Object.keys(t.log.passedTests).map((x)=>{
          return "<span title='See Parameters' class='simpleTesterTest'>["+ t.log.passedTests[x].length +"]" + x + "</span><br>"
          }).join("\n")      +`
        </div>
        <h2 id='simpleTesterFailedHeader' class='simpleTesterh2' style='color:#cc0000;cursor:pointer' >Failed: ${this.log['failed']} </h2>
        <div id='simpleTesterDrawer2' class ='simpleTesterDrawer'>
        `+  Object.keys(t.log.failedTests).map((x)=>{
          return "<span title='See Parameters' class='simpleTesterTest'>["+ t.log.failedTests[x].length +"]" + x + "</span><br>"
          }).join("\n")      +`
        </div>
        <h2 id='simpleTesterTestedHeader' class='simpleTesterh2' style='color:white;cursor:pointer' >Tested: ${this.log['tested']} </h2>
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

      $('.simpleTesterTest').css({'cursor':'pointer','border':'1px solid grey','border-radius':'1em','padding':'.2em'})
      $('.simpleTesterTest').on('mouseenter',(e)=>$(e.target).css('background-color','#aaaacc'))
      $('.simpleTesterTest').on('mouseleave',(e)=>$(e.target).css('background-color','#9999bb'))
      $('.simpleTesterTest').click((e)=>{

        var testName = e.target.innerHTML.split(']')[1];
        var testData = this.log.testedTests[testName];
        var time = this.log.testedTests[testName].time
        var paramKeys = Object.keys(testData[0].params)
        var paramWindow = $(document.createElement('div'));
        paramWindow.attr('class','paramWindowDiv')
        paramWindow.css({
          'position':'absolute',
          'padding':'2em',
          'top': String(window.innerHeight*.25) + 'px',
          'left':String(window.innerWidth*.25) + 'px',
          'height':'20em',
          'width':'20em',
          'zIndex':'2',
          'backgroundColor':'white',
          'overflow':'auto'
        })

        paramWindow.html(
          `
          <h2>${testName}</h3>
          <p>${this.tests[testName].des}</p>
          <table>
              <tr class="paramWindowTr">${paramKeys.map((x)=>{return '<th class="paramWindowTh">'+x+'</th>'}).join('') + '<th class="paramWindowTh">&#128337</th>'}</tr>
              ${testData.map((x)=>{return `<tr class="paramWindowTr"> 
                      ${paramKeys.map((y)=>{return `<td class='paramWindowTd'>${x.params[y]}</td>`}).join('')} <td>${x.time}ms</td>
              </tr>`}).join('\n')}
            </table>
          `
        )
    
        var closeButt = $(document.createElement('div')).html('X');

        $(document.body).append(paramWindow);
        paramWindow.append(closeButt)

        closeButt.click((e)=>{
          paramWindow.remove();
        })
        closeButt.css({
          'backgroundColor':'red',
          'fontWeight':'bold',
          'position':'absolute',
          'top':'0',
          'left':'0'

        })

        $('.paramWindowDiv>table').css({
          'fontFamily': 'arial, sans-serif',
          'borderCollapse': 'collapse',
          'textAlign':'center',
          'margin':'auto',
          'padding': '.5em',
          'backgroundColor':'#fafafa'
         }) 
         $('.paramWindowTh').css({
          'padding':'.5em',
          'border':'1px solid black'
         })
         $('.paramWindowTd').css({
          'padding':'.5em',
          'border':'1px solid #999999'
         })

         $('.paramWindowTr:odd').css({'backgroundColor':'#dddddd'})

      })

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
  