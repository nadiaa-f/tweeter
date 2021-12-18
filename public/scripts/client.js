//renders each tweet:
const renderTweets = function(tweets) {

  for (const tweet in tweets) {
    const tweetHTML = createTweetElement(tweets[tweet]);
    $('#tweet-container').prepend(tweetHTML);
  }
};

//prints tweet:
const loadLastTweet = function(tweet) {
  const tweetHTML = createTweetElement(tweet);
  $('#tweet-container').prepend(tweetHTML);
};

//tweet box element:
const createTweetElement = function(tweet) {
  let $tweet =
`<article class="tweet-box">
<header class="tweet-header">
  <img class="tweet-header-pic" src=${tweet.user.avatars}>
  <span class="tweet-header-name">${tweet.user.name}</span>
  <span class="tweet-username">${tweet.user.handle}</span>
</header>
<p class="tweet-body">
 ${escape(tweet.content.text)}
</p>
<footer class="tweet-footer">
  <div>
    <span>${timeago.format(tweet.created_at)}</span>
  </div>
  <div>
    <button class="btn"><i class="fa fa-flag"></i></button>
    <button class="btn"><i class="fa fa-share-alt"></i></button>
    <button class="btn"><i class="fa fa-heart"></i></button>
  </div>
</footer>
</article>`;

  return $tweet;
};

//prevents script from being passed into the form:
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//loads tweet:
const loadTweet = function() {
  $.ajax('/tweets', {method: 'GET'})
    .then(function(data) {
      renderTweets(data);
    });
};

//loaded page functions:
$(document).ready(function() {
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    if ($("#tweet-text").val().length === 0) {
      $(".error").html(`<i class="fas fa-exclamation-triangle"></i> &nbsp Please type in something to tweet! &nbsp <i class="fas fa-exclamation-triangle"></i>`).slideDown().delay(2000).slideUp(500);
      return;
    } else if ($("#tweet-text").val().length > 140) {
      $(".error").html(`<i class="fas fa-exclamation-triangle"></i> &nbsp Sorry! This tweet is too long! &nbsp <i class="fas fa-exclamation-triangle"></i>`).slideDown().delay(2000).slideUp(500);
    } else {
      $.post('/tweets', $(this).serialize()).then(
        function() {
          $("#tweet-text").val(''); 
          $.ajax('/tweets', {method: 'GET'})
            .then(function(data) {
              loadLastTweet(data[data.length - 1]);
            });
        });
    }
  });
});

//shows exisiting tweets when page is loaded:
loadTweet();