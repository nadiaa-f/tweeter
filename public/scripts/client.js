/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {

for (const tweet in tweets) {
  const tweetHTML = createTweetElement(tweets[tweet]);
  $('#tweet-container').append(tweetHTML);
}
}

const createTweetElement = function(tweet) {
let $tweet =
`<article class="tweet-box">
<header class="tweet-header">
  <img class="tweet-header-pic" src=${tweet.user.avatars}>
  <span class="tweet-header-name">${tweet.user.name}</span>
  <span class="tweet-username">${tweet.user.handle}</span>
</header>
<p class="tweet-body">
 ${tweet.content.text}
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

$(document).ready(function() {
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    $.post('/tweets', $(this).serialize());
  });
  $.ajax('/tweets', {method: 'GET'})
  .then(function(data) {
    renderTweets(data);
  });
});