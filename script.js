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
    document.getElementById('postForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Check if the user is logged in
  if (firebase.auth().currentUser) {
    const postContent = document.getElementById('postContent').value;
    const file = document.getElementById('photoUpload').files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`photos/${file.name}`);
    
    // Upload the file to Firebase Storage
    fileRef.put(file).then(() => {
      // Get the file URL
      fileRef.getDownloadURL().then((url) => {
        // Save post info to Firestore Database
        firebase.firestore().collection('posts').add({
          userId: firebase.auth().currentUser.uid,
          content: postContent,
          photoUrl: url,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      });
    });
  } else {
    alert('You must be logged in to post.');
  }
});
    firebase.firestore().collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = ''; // Clear existing posts
  snapshot.forEach(doc => {
    const post = doc.data();
    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <p>${post.content}</p>
      <img src="${post.photoUrl}" alt="User photo" style="max-width: 100%;">
      <!-- Reaction button here -->
    `;
    postsContainer.appendChild(postElement);
  });
});
}
