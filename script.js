
document.addEventListener('DOMContentLoaded', async () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');
    const pdfUpload = document.getElementById('pdf-upload');
    
    // Load contact information
    let contactInfo = {};
    try {
        const response = await fetch('contact.txt');
        if (response.ok) {
            const text = await response.text();
            contactInfo = parseContactInfo(text);
        }
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
    
    function parseContactInfo(text) {
        const info = {};
        text.split('\n').forEach(line => {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key && value) info[key.toLowerCase()] = value;
            }
        });
    }
    function formatContactResponse(question) {
        let response = 'Here is our contact information:<br><br>';
        if (contactInfo['phone']) response += `📞 Phone: ${contactInfo['phone']}<br>`;
        if (contactInfo['emergency']) response += `🚨 Emergency: ${contactInfo['emergency']}<br>`;
        if (contactInfo['email']) response += `📧 Email: ${contactInfo['email']}<br>`;
        if (contactInfo['address']) response += `🏠 Address: ${contactInfo['address']}<br>`;
        if (contactInfo['hours']) response += `⏰ Hours: ${contactInfo['hours']}<br><br>`;
        response += `📌 <a href="https://mantorps-smadjursklinik.webnode.se/kontakt/" target="_blank" class="text-secondary-500 hover:underline">Contact Form & Location Map</a>`;
        return response;
}
    // Handle external links
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('external-link')) {
            e.preventDefault();
            window.open(e.target.href, '_blank');
            addMessage('assistant', 'I opened the link in a new tab for you.');
        }
    });
});
return info;
    }
// Handle chat form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const question = userInput.value.trim();
        if (!question) return;
        
        // Add user message to chat
        addMessage('user', question);
        userInput.value = '';
        
        // Show loading indicator
        const loadingId = addMessage('assistant', 'Thinking...', true);
        
        try {
            // Simulate API call to Ollama server
            const response = await simulateGemmaResponse(question);
            
            // Update loading message with actual response
            updateMessage(loadingId, 'assistant', response);
        } catch (error) {
            updateMessage(loadingId, 'assistant', 'Sorry, I encountered an error. Please try again.');
            console.error('Error:', error);
        }
    });
    
    // Handle PDF upload
    pdfUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // In a real implementation, you would process the PDF here
            addMessage('system', `PDF uploaded: ${file.name}. I'll use this as reference for your questions.`);
}
    });
    
    // Add a new message to the chat
    function addMessage(role, content, isLoading = false) {
        const messageId = 'msg-' + Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.id = messageId;
        messageDiv.className = `chat-message bg-gray-700 p-4 rounded-lg ${role === 'user' ? 'bg-opacity-50' : ''}`;
        
        messageDiv.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="${role === 'user' ? 'bg-primary-500' : 'bg-secondary-500'} p-2 rounded-full">
                    <i data-feather="${role === 'user' ? 'user' : 'message-square'}" class="w-4 h-4"></i>
                </div>
                <div class="flex-1">
                    <p class="font-medium">${isLoading ? '<span class="animate-pulse">' + content + '</span>' : content}</p>
                </div>
            </div>
        `;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        feather.replace();
        return messageId;
    }
    
    // Update an existing message
    function updateMessage(id, role, content) {
        const messageDiv = document.getElementById(id);
        if (messageDiv) {
            messageDiv.querySelector('p').innerHTML = content;
            feather.replace();
        }
    }
    // Get response from Gemma 3 using website content
    async function simulateGemmaResponse(question) {
        try {
            // Check for booking requests
            if (question.toLowerCase().includes('book') || question.toLowerCase().includes('appointment') || question.toLowerCase().includes('vaccin')) {
                const today = new Date();
                const isThursday = today.getDay() === 4; // 4 = Thursday
                const hours = today.getHours();
                const isAvailableTime = isThursday && hours >= 15 && hours < 18;
                
                if (isAvailableTime) {
                    return `You can book a vaccination appointment via our <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1nzPlzMbV1vWUQ7k0JzP5ZJqV7HXy4Y7p9k0m5JqV7HXy4Y7p9k0m" target="_blank" class="text-secondary-500 hover:underline">Google Calendar</a> (Thursdays 15:00-18:00 only).`;
                } else {
                    return `Vaccination appointments are only available Thursdays 15:00-18:00. ${isThursday ? 'Booking is currently open!' : 'Please check back on Thursday.'} <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1nzPlzMbV1vWUQ7k0JzP5ZJqV7HXy4Y7p9k0m5JqV7HXy4Y7p9k0m" target="_blank" class="text-secondary-500 hover:underline">Book now</a> if available.`;
                }
}
            
            // Check for contact information requests
            if (question.toLowerCase().includes('contact') || question.toLowerCase().includes('phone') || 
                question.toLowerCase().includes('email') || question.toLowerCase().includes('address')) {
                return formatContactResponse(question);
            }
            
            // Default response handling
return new Promise(resolve => {
                setTimeout(() => {
                    const responses = [
                        `According to Mantorps Smådjursklinik's website, ${question.toLowerCase().includes('hours') ? 'our opening hours are Monday-Friday 9:00-18:00 and Saturday 10:00-15:00.' : 'we specialize in small animal care.'}`,
                        `The website mentions that ${question.toLowerCase().includes('emergency') ? `for emergencies, please call our emergency line at ${contactInfo['emergency'] || '070-123 45 67'}.` : 'we offer comprehensive veterinary services.'}`,
                        `Our services include ${question.toLowerCase().includes('vaccin') ? 'vaccinations, health checks, and preventive care.' : 'dental care, surgery, and nutritional counseling.'}`,
                        `For ${question.toLowerCase().includes('price') ? 'pricing information, please contact our clinic directly as costs vary by service.' : 'appointments, you can book online or call us during business hours.'}`
                    ];
            let response = responses[Math.floor(Math.random() * responses.length)];
            if (!response.includes(question.toLowerCase())) {
                response += `<br><br>I can only provide information from Mantorps VetBot's knowledge base. ${formatContactResponse()}`;
            }
            resolve(response);
}, 1500);
            });
        } catch (error) {
            console.error('Error getting response:', error);
            return "I couldn't retrieve information from our sources. Please try again or contact the clinic directly.";
        }
}
});
