var ideasArray = [];
var ideaTitle = $('.title-input').val();
var ideaBody = $('.body-input').val();
var ideaId = Date.now();
var ideaRanking = 'swill';
var saveButton = $('.idea-submit');

//checks both input fields and generates unique ID

function getIdeaInputs(){
  ideaTitle = $('.title-input').val();
  ideaBody = $('.body-input').val();
  ideaId = Date.now();
}

//generate ideasArray from local storage

function loadArray(){
  if (JSON.parse(localStorage.getItem('ideas'))){
    ideasArray = JSON.parse(localStorage.getItem('ideas'));
  return ideasArray;
  }
}

loadArray();

function clearInputs() {
  $('.title-input').val("");
  $('.body-input').val("");
  getIdeaInputs();
}

//passes array through function which creates dom elements.  Run on page load after ideasArray has been populated

function repopulateDOM(){
  for (i=0; i<ideasArray.length; i++){
    $('ul').prepend(ideaTemplate(ideasArray[i].title, ideasArray[i].body, ideasArray[i].ranking, ideasArray[i].id));
  }
}

repopulateDOM();

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
             "<p class='ranking'>quality: <span class='quality-css'>" + ranking + "</span></p>" +
          "</footer>" +
         "</li>";
}

//idea constructor

function Idea(title, body, id, ranking) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.ranking = ranking;
}

//functions to manipulate ideasArray

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

// qualityArray = ['swill', 'medium', 'genius']

//function called in event listeners checking the input fields and disabling if either input is null

function buttonStatus(){
  if (ideaTitle && ideaBody)
    {return saveButton.attr("disabled", false);
  }else{
    return saveButton.attr("disabled", true);
  }
}

//Search field finds a given value within an li, then slides up to remove and down to show accordingly.

function search(searchTerm) {
  if(searchTerm !== "") {
    $('ul').find('li:not(:contains('+ searchTerm + '))').slideUp();
    $('ul').find('li:contains(' + searchTerm + ')').slideDown();
  } else {
    $('ul').find('li').slideDown();
  }
}

//Filter searches footer for filter criteria since this is the only text in the footer.

function filter(filterCriteria) {
  if(filterCriteria !== 'Select Filter' ) {
    $('ul').find('footer:not(:contains(' + filterCriteria + '))').parent().hide()
    $('ul').find('footer:contains(' + filterCriteria + ')').parent().show();
  } else {
      $('ul').find('li').show();
  }
}

//event listeners wrapped in document-ready

$(document).ready(function() {

//event listener for filter

  $('select').on('change', function() {
    var filterCriteria = $('select option:selected').text();
    filter(filterCriteria);
    });

//event listener for search

  $('.js-search').on('keyup', function(){
    var searchTerm = $(this).val();
    search(searchTerm);
  });

//grabs values from input fields, generates random ID, and checks the input fields for validity

  $('.idea-input').on('keyup', 'input', function(){
    getIdeaInputs();
    buttonStatus();
  });


//event listener to make enter when editting an existing idea submit the changes

  $('ul').on('keydown', '.body', function(e){
    var data = parseInt(this.closest('li').id);
    updateBodyById(data, $(this).text());
    updateArray();
    if (e.keyCode === 13){
      $('.body').blur();
      e.preventDefault();
    }
  });

//event listener for downvote

  $('ul').on('click', '.downvote', function(){
    var id = parseInt(this.closest('li').id);
    if (findObjectById(id).ranking == "plausible") {
      updateRankingById(id, 'swill');
      $(this).siblings('.ranking').text('quality: swill');
    }
    if (findObjectById(id).ranking == "genius") {
      updateRankingById(id, 'plausible');
      $(this).siblings('.ranking').text('quality: plausible');
    }
    updateArray();
  });

//event listener for upvote

  $('ul').on('click', '.upvote', function(){
    var id = parseInt(this.closest('li').id);
    if (findObjectById(id).ranking == "plausible") {
      updateRankingById(id, 'genius');
      $(this).siblings('.ranking').text('quality: genius');
    }
    if (findObjectById(id).ranking == "swill") {
      updateRankingById(id, 'plausible');
      $(this).siblings('.ranking').text('quality: plausible');
    }
    updateArray();
  });

//event listener for delete button

  $('ul').on('click', '.remove', function(){
    var id = parseInt(this.closest('li').id);
    this.closest('li').remove();
    var position = ideasArray.indexOf(findObjectById(id));
    ideasArray.splice(position, 1);
    updateArray();
  });

//event listener to submit new idea.  updates inputs, passes inputs through constructor, create dom element, update the array in local storage, clear inputs and update button disable toggle

  saveButton.on('click', function(){
    getIdeaInputs();
    var newIdeaObject = new Idea(ideaTitle, ideaBody, ideaId, ideaRanking);
    $('ul').prepend(ideaTemplate(ideaTitle, ideaBody, ideaRanking, ideaId));
    ideasArray.push(newIdeaObject);
    updateArray();
    clearInputs();
    buttonStatus();
  });
});
