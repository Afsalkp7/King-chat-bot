var date = new Date();
const dateArray = date.toString().split(" ").splice(1, 3).join(" ");
document.getElementById("date").innerHTML = dateArray;

const chat = document.getElementById("chat");
const messageBtn = document.getElementById("messageBtn");
const messageInput = document.getElementById("messageChat");

messageBtn.addEventListener("click", generateMessage);
messageInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      generateMessage();
    }
  });

async function generateMessage() {
  const messageChat = document.getElementById("messageChat").value;
  if (messageChat.trim() === "") {
    return;
  }
  messageBtn.disabled = true;

  const message = document.createElement("div");
  message.classList.add("message", "response");

  const replay = document.createElement("div");
  replay.classList.add("message", "replay");

  message.innerHTML = messageChat;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;

  const config = {
    contents: [
      {
        parts: [
          {
            text: messageChat,
          },
        ],
      },
    ],
  };

  document.getElementById('messageChat').value = ''

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDJC5a882ruaC4XL6ejY1yhgRkN-JNQKg8",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    }
  );
   
    const data = await res.json();
    const textValues = await data.candidates.map(candidate => candidate.content.parts.map(part => part.text)).flat();
    await new Promise((r) => setTimeout(r, 500));

    replay.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`;
    chat.appendChild(replay);
    chat.scrollTop = chat.scrollHeight;

    await new Promise((r) => setTimeout(r, 1500));

    replay.innerHTML = `${textValues[0]}`;
    chat.scrollTop = chat.scrollHeight;

    messageBtn.disabled = false;
    return
}
