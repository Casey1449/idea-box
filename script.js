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
  ideaId = Date.now();
}

saveButton.on('click', function(){
  getIdeaInputs();
  var obj = new idea(ideaTitle, ideaBody, ideaId, ideaRanking);
  $('ul').append(ideaTemplate(ideaTitle, ideaBody, ideaRanking));
  ideasArray.push(obj);
  //create new idea object from constructor
  localStorage.setItem('ideas', JSON.stringify(ideasArray));
})

function idea (title, body, id, ranking) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.ranking = ranking;
}


// function findShit(ideaTitle) {
//   ideasArray.find(function(el) {
//     return el.title === ideaTitle;
//   });
// }




// function NewIdeaObject() {
//   var ideaObject = {id: ideaId, title: ideaTitle, body: ideaBody};
//   ideasArray.push(ideaObject);
//   $('ul').append(ideaTemplate(JSON.stringify(ideaObject)));
//   // ideaTemplate(ideaObject)
//   // return ideaObject;
//   localStorage.setItem('ideas', JSON.stringify(ideasArray));
// }


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

function findObjectById(targetId){
  for (i=0; i<ideasArray.length, i++){
    if (ideasArray[i].id === targetId){
      return ideasArray[i]};
  };
};
