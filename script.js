var ideasArray = [];
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

function updateArray(){
  if (JSON.parse(localStorage.getItem('ideas'))){
    ideasArray = JSON.parse(localStorage.getItem('ideas'));
  return ideasArray
  };
};

updateArray();

function repopulateDOM(){
  for (i=0; i<ideasArray.length; i++){
    $('ul').append(ideaTemplate(ideasArray[i].title, ideasArray[i].body, ideasArray[i].ranking, ideasArray[i].id));
  }

}

repopulateDOM();

function Idea(title, body, id, ranking) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.ranking = ranking;
}

  function ideaTemplate(title, body, ranking, id) {

    return "<li data = " + id +">" +
            "<header>" +
               "<h2 contenteditable = 'true'>" + title + "</h2>" +
               "<button>delete</button>" +
            "</header>" +
            "<p contenteditable='true'>" + body + "</p>" +
            "<footer>" +
               "<button>upvote</button>" +
               "<button>downvote</button>" +
               "<p>ranking:" + ranking + "</p>";
            "</footer>" +
           "</li>";
  }

  function findObjectById(targetId){
     for (i=0; i<ideasArray.length; i++) {
       if (ideasArray[i].id === targetId){
         return ideasArray[i]};
     };
   };

   function updateTitleById(targetId, newValue){
      for (i=0; i<ideasArray.length; i++) {
        if (ideasArray[i].id === targetId){
          ideasArray[i].title = newValue};
      };
    };

    function updateBodyById(targetId, newValue){
       for (i=0; i<ideasArray.length; i++) {
         if (ideasArray[i].id === targetId){
           ideasArray[i].body = newValue};
       };
     };

     function updateRankingById(targetId, newValue){
        for (i=0; i<ideasArray.length; i++) {
          if (ideasArray[i].id === targetId){
            ideasArray[i].ranking = newValue};
        };
      };

      saveButton.on('click', function(){
        getIdeaInputs();
        var littleIdea = new Idea(ideaTitle, ideaBody, ideaId, ideaRanking);
        $('ul').append(ideaTemplate(ideaTitle, ideaBody, ideaRanking, ideaId));
        ideasArray.push(littleIdea);
        localStorage.setItem('ideas', JSON.stringify(ideasArray));
      })
