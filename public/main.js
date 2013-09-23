$(document).ready(function(){
  $("#console").terminal(
    function(command, term){
      var write = function(data){
        if($.isArray(data)){
          for(i in data){
            write(data[i]);
          }
        }
        else if(typeof data=='string'){
          term.echo(data, {raw: false});
        }
        else if(typeof data=="object"){
          term.echo(data.msg,{raw:data.raw});
        }
      }
      term.pause();//pause it till we get a reply
      var url = "/"+command.split(' ').join('/');
      $.getJSON(url, function(data){
        write(data);
        term.resume();
      });
      $(document).ajaxError(function(e){
        term.resume();
      })
    },
    {
      greetings: 'Welcome to CodeBot. Type [[b;;]help] to begin',
      height: $(window).height()-100,
      prompt: 'CodeBot > ',
      tabcompletion: true,
      completion: function(term, partialCommand, cb){
        cb(["problems, problem"]);
      }
    }
  )
});