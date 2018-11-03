// Dynamically add a "run" button to all executable code snippets.
let runnableCode = document.getElementsByClassName('runCode');

for (preBlock of runnableCode) {
  let runDiv = document.createElement('div');
  preBlock.insertBefore(runDiv, preBlock.firstChild);
  runDiv.className = 'buttons';
  let runBtn = document.createElement('button');
  runBtn.innerText = 'Run';
  runDiv.append(runBtn);

  runBtn.addEventListener('click', function(ev) {
    run_c_code(preBlock);
  });
}

function run_c_code(codeBlock) {
  console.log(codeBlock);
  // Select from descendents of the current element, not from the entire document.
  // getElementsByClassName() returns an HTML selection;
  // querySelector() returns an Element.
  let outputBlock = codeBlock.querySelector('.output');
  if (!outputBlock) {
    outputBlock = document.createElement('code');
    outputBlock.className = 'output';
    codeBlock.append(outputBlock);
  }

  outputBlock.innerText = 'Compiling...';
  const request = new Request('http://localhost:5000/static/blog.js');
  let response = fetch(request)
    .then(response => {
      outputBlock.innerText = response.output;
      console.log(response);
    })
    .catch(error => {
      console.log('Error running code' + error.message);
    });

}
