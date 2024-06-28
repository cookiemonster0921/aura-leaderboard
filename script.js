var names =  document.getElementsByClassName('name')
var scores = document.getElementsByClassName('score')
var edit = document.getElementById('edit')
var add = document.getElementById('add')
var save = document.getElementById('save')
var list = document.getElementById('list')
window.onload = () => {
  
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  //data = '{"fefe":"1500","person 2":"140","ben":"1300"}'
  // Sending the POST request
  fetch('https://leaderboard-application.glitch.me/display', options)
    .then(response => response.text())
    .then(data => {
      //console.log(data);
      count = 1
      for (var x in JSON.parse(data)) {
        //console.log('s')
          var record = document.createElement('li')
          var rank = document.createElement('span')
          var name1 = document.createElement('span')
          var score = document.createElement('span')
        rank.classList.add('rank')
        name1.classList.add('name')
        score.classList.add('score')
        rank.textContent = count
        name1.textContent = x
        score.textContent = JSON.parse(data)[x]
        record.appendChild(rank)
        record.appendChild(name1)
        record.appendChild(score)
        list.appendChild(record)
        count += 1
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
 
}


edit.addEventListener('click', () => {
  for (var x = 0; x<scores.length;x++) {
    scores[x].contentEditable = true
  }
  for (var x = 0;x<names.length;x++) {
    names[x].contentEditable = true
  }
})

add.addEventListener('click', () => {
  var entry = document.createElement('li')
  var name = document.createElement('span')
  var rank = document.createElement('span')
  name.classList.add('name')
  name.contentEditable = true
  name.textContent = 'Name'
  var score = document.createElement('span')
  rank.textContent = ''
  score.classList.add('score')
  score.contentEditable = true
  score.textContent = '0'
  entry.appendChild(rank)
  entry.appendChild(name)
  entry.appendChild(score)
 
  list.appendChild(entry)
})

save.addEventListener('click',  () => {
  /**fetch to discord for storage */
  var data = {}
  //console.log(list.children.length)
  for (var x = 0; x<list.children.length; x++) {
    //console.log('z')
    //console.log(list.children[x])
   // console.log(list.children[x].children.length)
    for (var y = 0; y<list.children[x].children.length; y++) {
      //console.log(list.children[x].children[y])
      //console.log('x')
      if (y == 0) {
        continue
      }
      data[list.children[x].children[1].textContent] = list.children[x].children[2].textContent
      
    }
  }
    // Convert the object to an array of key-value pairs
    console.log(data)
    const keyValuePairs = Object.entries(data);
    //console.log(keyValuePairs)
    var c = 0
    var alerted = false
    const validKeyValuePairs = keyValuePairs.filter(([key, value]) => {
      if (parseInt(value) == 'NaN') {
        if (alerted) {
          
        }
        else {
          alert('nothing')
          alerted = true
          c = 1
        }
      }
      else if (parseInt(value).toString().length != value.length) {
        if (alerted) {

        }
        else {
          alert('something')
          alerted = true
          c = 1
        }
      }
    });
    // Sort the array based on the values
    if (c == 0) {
      keyValuePairs.sort((a, b) => b[1] - a[1]);
        //console.log(keyValuePairs)
        // Convert the sorted array back to an object
        const sortedJson = Object.fromEntries(keyValuePairs);

        console.log(sortedJson);
        var options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sortedJson)
        };

        // Sending the POST request
        fetch('https://leaderboard-application.glitch.me/write', options)
          .then(response => response.text())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }
  
})

