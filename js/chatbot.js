document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatInterface = document.getElementById('chat-interface');
    const chatOutput = document.getElementById('messages');
    const sendButton = document.getElementById('sendBtn');

    // Toggle chat interface visibility
    chatbotButton.addEventListener('click', function() {
        chatInterface.style.display = chatInterface.style.display === 'none' ? 'block' : 'none';
        if (chatInterface.style.display === 'block') {
            greetUser();
        }
    });

    document.getElementById('close-chat').addEventListener('click', function() {
        chatInterface.style.display = 'none';
    });
    function greetUser() {
        const currentHour = new Date().getHours();
        let greeting;

        if (currentHour < 12) {
            greeting = "Good Morning! How can I assist you today?";
        } else if (currentHour < 18) {
            greeting = "Good Afternoon! How can I help you?";
        } else {
            greeting = "Good Evening! What would you like to know?";
        }

        appendBotMessage(greeting);
        displayFAQButtons();
    }

    // Send button functionality
    sendButton.addEventListener('click', function() {
        const userInput = document.getElementById('userInput').value.trim();

        if (userInput) {
            appendUserMessage(userInput);
            respondToUser(userInput);
            document.getElementById('userInput').value = ''; // Clear input field
        }
    });

    // Display frequently asked questions
    function displayFAQButtons() {
        const faqContainer = document.createElement('div');
        faqContainer.classList.add('faq-container');
        faqContainer.innerHTML = `
            <button class="faq-btn" onclick="quickReply('programs')">Programs</button>
            <button class="faq-btn" onclick="quickReply('events')">Events</button>
            <button class="faq-btn" onclick="quickReply('volunteer?')">Volunteer</button>
        `;
        chatOutput.appendChild(faqContainer);
    }

    // Quick reply functionality
    window.quickReply = function(message) {
        appendUserMessage(message);
        respondToUser(message);
    };

    // Append user message to chat
    function appendUserMessage(message) {
        chatOutput.innerHTML += `<div class="user-message">${message}</div>`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    // Append bot message to chat
    function appendBotMessage(message) {
        chatOutput.innerHTML += `<div class="bot-message">${message}</div>`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('bot-message');
        typingIndicator.innerHTML = 'Typing...';
        typingIndicator.id = 'typing-indicator';
        chatOutput.appendChild(typingIndicator);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Function to respond to user input with dynamic delay
    function respondToUser(input) {
        showTypingIndicator(); // Show typing indicator

        setTimeout(() => {
            removeTypingIndicator(); // Remove indicator before response

            const responses = {
                "hello": "Hello! How can I assist you today?",
                "programs": "We offer various programs including workshops and mentorship. Would you like more details?",
                "events": "We have several events lined up for this month. Check our Events page for more information.",
                "volunteer": "Thank you for your interest! Please visit our Volunteer page for more details.",
                "contact": "Visit our Contact page for ways to reach us.",
                "registration": "You can register on our Registration page by filling out the form.",
                "location": "We are based in Johannesburg, but our services are nationwide.",
                "requirements": "Requirements vary by program. Check the Programs page for more details.",
                "support": "We provide training, mentorship, and career guidance. Which would you like to learn more about?",
                "thank you": "You're welcome! Feel free to ask more questions.",
                "goodbye": "Goodbye! Have a great day!",
                "tell me more": "Sure! What specific information would you like to know more about?"
            };

            const response = responses[input.toLowerCase()] || "I'm not sure how to respond to that. Could you rephrase?";
            appendBotMessage(response);
        }, 1000); // Simulate typing delay
    }
});
