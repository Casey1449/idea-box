// when document is ready, load event listeners and locallystored ideas
var ideasArray = []
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
var ideaId = Date.now();
var ideaRanking = 'swill'
var saveButton = $('.idea-submit');


function getIdeaInputs(){
  ideaTitle = $('.title-input').val();
  ideaBody = $('.body-input').val();
}

saveButton.on('click', function(){
  getIdeaInputs();
  $('ul').append(ideaTemplate(ideaTitle, ideaBody, ideaRanking));
  //create new idea object from constructor
})


function NewIdea() {
  var ideaObject = {id: ideaId, title: ideaTitle, body: ideaBody};
  ideas.push(idea);
  ideaTemplate(idea)
  //append to ul
  //store ideas[] locallystored
}


  function ideaTemplate(title, body, ranking) {
    return "<li>" +
            "<header>" +
               "<h2>" + title + "</h2>" +
               "<button>delete</button>" +
            "</header>" +
            "<p>" + body + "</p>" +
            "<footer>" +
               "<button>upvote</button>" +
               "<button>downvote</button>" +
               "<p>ranking:" + ranking + "</p>";
            "</footer>" +
           "</li>";
  }
