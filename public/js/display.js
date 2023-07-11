const homeLocation = "http://localhost:3000/";
let thisLocation = self.location.href.toString();
let item = [];

if (thisLocation == homeLocation) {
    displayPosts();
};

async function displayPosts() {

    console.log("Displaying Post(s)")
    const postRes = await fetch('api/post/', {
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
    console.log(item[0].name);
};