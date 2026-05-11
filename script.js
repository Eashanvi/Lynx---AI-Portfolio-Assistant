const chatBox =
document.getElementById("chat-box");

const userInput =
document.getElementById("user-input");

// ======================================
// SEND MESSAGE
// ======================================

window.sendMessage = async function () {

    const message = userInput.value.trim();

    if (!message) return;

    // USER MESSAGE
    chatBox.innerHTML += `
        <p class="user-message">
            <strong>You:</strong> ${message}
        </p>
    `;

    userInput.value = "";

    // AUTO SCROLL
    chatBox.scrollTop =
    chatBox.scrollHeight;

    try {

        const response = await fetch(
            "http://localhost:3000/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data =
        await response.json();

        // BOT MESSAGE
        chatBox.innerHTML += `
            <p class="bot-message">
                <strong>Bot:</strong>
                ${data.generated_text}
            </p>
        `;

        // AUTO SCROLL
        chatBox.scrollTop =
        chatBox.scrollHeight;

    } catch (error) {

        chatBox.innerHTML += `
            <p class="bot-message">
                AI connection error 😅
            </p>
        `;
    }
};

function quickAsk(text){

    document
    .getElementById("user-input")
    .value = text;

    sendMessage();
}

// ENTER KEY SUPPORT

document
.getElementById("user-input")

.addEventListener(

    "keypress",

    function(event){

        if(event.key === "Enter"){

            sendMessage();
        }
    }
);