document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const postContent = document.getElementById('postContent').value;
    displayPost(postContent);
    document.getElementById('postContent').value = ''; // Clear form
});

function displayPost(content) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <p>${content}</p>
        <span class="reaction" onclick="addReaction(this)">❤️ 0</span>
    `;
    document.getElementById('postsContainer').prepend(postElement);
}

function addReaction(element) {
    let currentCount = parseInt(element.textContent.trim().split(' ')[1]);
    element.innerHTML = `❤️ ${++currentCount}`;
}
function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
