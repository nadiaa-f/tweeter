/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {

for (const tweet in tweets) {
  const tweetHTML = createTweetElement(tweets[tweet]);
  $('#tweet-container').prepend(tweetHTML);
}
}

const loadLastTweet = function(tweet) {
  const tweetHTML = createTweetElement(tweet);
  $('#tweet-container').prepend(tweetHTML);
};

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
</article>`

return $tweet;
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweet = function() {
  $.ajax('/tweets', {method: 'GET'})
    .then(function(data) {
      renderTweets(data);
    });
};
$(document).ready(function() {
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    if ($("#tweet-text").val().length === 0) {
      alert('Please type in something to tweet!');
    } else if ($("#tweet-text").val().length > 140) {
      alert('Sorry! This tweet is too long!');
    } else {
      $.post('/tweets', $(this).serialize()).then(
        function() {
          $.ajax('/tweets', {method: 'GET'})
            .then(function(data) {
              loadLastTweet(data[data.length - 1]);
            });
        });
    }
  });
});
loadTweet();