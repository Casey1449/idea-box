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

function clearInputs() {
  $('.title-input').val("");
  $('.body-input').val("");
  getIdeaInputs();
}

loadArray();

function repopulateDOM(){
  for (i=0; i<ideasArray.length; i++){
    $('ul').prepend(ideaTemplate(ideasArray[i].title, ideasArray[i].body, ideasArray[i].ranking, ideasArray[i].id));
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
               "<button class='remove'></button>" +
            "</header>" +
            "<p contenteditable='true' class='body'>" + body + "</p>" +
            "<footer>" +
               "<button class='upvote'></button>" +
               "<button class='downvote'></button>" +
               "<p class='ranking'>ranking: " + ranking + "</p>";
            "</footer>" +
           "</li>";
  }

  function findObjectById(targetId){
     for (i=0; i<ideasArray.length; i++) {
       if (ideasArray[i].id === targetId){
         return ideasArray[i];
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
        var newIdeaObject = new Idea(ideaTitle, ideaBody, ideaId, ideaRanking);
        $('ul').prepend(ideaTemplate(ideaTitle, ideaBody, ideaRanking, ideaId));
        ideasArray.push(newIdeaObject);
        updateArray();
        clearInputs();
        buttonStatus();
      });

// delete

      $('ul').on('click', '.remove', function(){
        var id = parseInt(this.closest('li').id);
        this.closest('li').remove();
        var position = ideasArray.indexOf(findObjectById(id));
        ideasArray.splice(position, 1);
        updateArray();
      });

// upvote

$('ul').on('click', '.upvote', function(){
  var id = parseInt(this.closest('li').id);
  if (findObjectById(id).ranking == "plausible") {
    updateRankingById(id, 'genius');
    $(this).siblings('.ranking').text('ranking: genius');
  }
  if (findObjectById(id).ranking == "swill") {
    updateRankingById(id, 'plausible');
    $(this).siblings('.ranking').text('ranking: plausible');
  }
  updateArray();
});

//downvote

$('ul').on('click', '.downvote', function(){
  var id = parseInt(this.closest('li').id);
  if (findObjectById(id).ranking == "plausible") {
    updateRankingById(id, 'swill');
    $(this).siblings('.ranking').text('ranking: swill');
  }
  if (findObjectById(id).ranking == "genius") {
    updateRankingById(id, 'plausible');
    $(this).siblings('.ranking').text('ranking: plausible');
  }
  updateArray();
});

//edit title field

$('ul').on('keyup', 'h2', function(){
  var data = parseInt(this.closest('li').id);
  updateTitleById(data, $(this).text());
  updateArray();
});

//edit body field

$('ul').on('keyup', '.body', function(){
  var data = parseInt(this.closest('li').id);
  updateBodyById(data, $(this).text());
  updateArray();
});

// function getIdFromDOM(){
//   parseInt(this.closest('li').id);
// }

//better idea?
// qualityArray = ['swill', 'medium', 'genius']

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

// search

$('.js-search').on('keyup', function(){
  var searchTerm = $(this).val();
  if(searchTerm) {
    $('ul').find('li:not(:contains('+ searchTerm + '))').slideUp();
    $('ul').find('li:contains(' + searchTerm + ')').slideDown();
  } else {
    $('ul').find('li').slideDown();
  }
});
