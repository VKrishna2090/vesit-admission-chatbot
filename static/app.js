class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener('keyup', ({ key }) => {
            if (key === "Enter") {
                // console.log("Enter");
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;
        // console.log("Toggle");
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            console.log("Text empty");
            return;
        }

        let msg1 = { name: "User", message: text1 }
        // console.log("Message: " + msg1.message);
        this.messages.push(msg1);

        // http://127.0.0.1:5000/predict
        fetch($SCRIPT_ROOT + "/predict", {
            method: "POST",
            body: JSON.stringify({ message: text1 }),
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => response.json())
            .then(r => {
                let msg2 = { name: "Bot", message: r.answer }
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
            }).catch(error => {
                console.log("Error:" + error);
                this.updateChatText(chatbox);
                textField.value = "";
            });
    }

    updateChatText(chatbox) {
        // console.log("Response");
        var html = "";
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name == "Bot") {
                html += "<div class='messages__item messages__item--visitor'>" + item.message + "</div>";
            }
            else {
                html += "<div class='messages__item messages__item--operator'>" + item.message + "</div>";
            }
        })

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html
    }
}

const chatbox = new Chatbox();
chatbox.display();