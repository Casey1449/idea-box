var ideasArray = [];
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
var ideaId = Date.now();
var ideaRanking = 'swill';
var saveButton = $('.idea-submit');

function getIdeaInputs(){
  ideaTitle = $('.title-input').val();
  ideaBody = $('.body-input').val();
  ideaId = Date.now();
}

function loadArray(){
  if (JSON.parse(localStorage.getItem('ideas'))){
    ideasArray = JSON.parse(localStorage.getItem('ideas'));
  return ideasArray;
  }
}

loadArray();

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

    return "<li id= " + id + ">" +
            "<header>" +
               "<h2 contenteditable = 'true'>" + title + "</h2>" +
               "<button class='remove'>delete</button>" +
            "</header>" +
            "<p contenteditable='true'>" + body + "</p>" +
            "<footer>" +
               "<button class='upvote'>upvote</button>" +
               "<button class='downvote'>downvote</button>" +
               "<p class='ranking'>ranking: " + ranking + "</p>";
            "</footer>" +
           "</li>";
  }

  function findObjectById(targetId){
     for (i=0; i<ideasArray.length; i++) {
       if (ideasArray[i].id === targetId){
         return i;
     }
   }
 }

   function updateTitleById(targetId, newValue){
      for (i=0; i<ideasArray.length; i++) {
        if (ideasArray[i].id === targetId){
          ideasArray[i].title = newValue;
        }
      }
    }

    function updateBodyById(targetId, newValue){
       for (i=0; i<ideasArray.length; i++) {
         if (ideasArray[i].id === targetId){
           ideasArray[i].body = newValue;
         }
       }
     }

     function updateRankingById(targetId, newValue){
        for (i=0; i<ideasArray.length; i++) {
          if (ideasArray[i].id === targetId){
            ideasArray[i].ranking = newValue;
          }
        }
      }

      function updateArray() {
        localStorage.setItem('ideas', JSON.stringify(ideasArray));
      }

// submit

      saveButton.on('click', function(){
        getIdeaInputs();
        var littleIdea = new Idea(ideaTitle, ideaBody, ideaId, ideaRanking);
        $('ul').append(ideaTemplate(ideaTitle, ideaBody, ideaRanking, ideaId));
        ideasArray.push(littleIdea);
        updateArray();
      });

// delete

      $('ul').on('click', '.remove', function(){
        var data = parseInt(this.closest('li').id);
        this.closest('li').remove();
        var position = findObjectById(data);
        ideasArray.splice(position, 1);
        updateArray();
      });

// upvote

$('ul').on('click', '.upvote', function(){
  var data = parseInt(this.closest('li').id);
  var position = findObjectById(data);
  if (ideasArray[position].ranking == "medium") {
    updateRankingById(data, 'genius');
    $(this).siblings('.ranking').text('ranking: genius');
  }
  if (ideasArray[position].ranking == "swill") {
    updateRankingById(data, 'medium');
    $(this).siblings('.ranking').text('ranking: medium');
  }
  updateArray();
});

//downvote

$('ul').on('click', '.downvote', function(){
  var data = parseInt(this.closest('li').id);
  var position = findObjectById(data);
  if (ideasArray[position].ranking == "medium") {
    updateRankingById(data, 'swill');
    $(this).siblings('.ranking').text('ranking: swill');
  }
  if (ideasArray[position].ranking == "genius") {
    updateRankingById(data, 'medium');
    $(this).siblings('.ranking').text('ranking: medium');
  }
  updateArray();
});

//better idea?
// qualityArray = ['swill', 'medium', 'genius']

// function checkBothInputs() {
//   if (ideaTitle.length === 0) {return $('idea-submit').attr("disabled", true)}
//   if (ideaBody.length === 0) {return $('idea-submit').attr("disabled", true)}
//   return $('idea-submit').attr("disabled", false)
// }

function buttonStatus(){
  if (ideaTitle && ideaBody)
    {return saveButton.attr("disabled", false);
  }else{
    return saveButton.attr("disabled", true);
  }
}

$('.idea-input').on('keyup', 'input', function(){
  getIdeaInputs();
  buttonStatus();
});
