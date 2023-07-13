const homeLocation = "http://localhost:3000/";
let thisLocation = self.location.href.toString();
let item = [];

if (thisLocation == homeLocation) {
    displayPosts();
};

async function displayPosts() {

    console.log("Displaying Post(s)")
    const postRes = await fetch('api/posts/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(response => {
            return response;
        });

    for (let i = 0; i < postRes.length; i++) {
        item[i] = postRes[i];
    };

    console.log(item);
    console.log(item[0].title);
};
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();
  
    if (title && body) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

  document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
