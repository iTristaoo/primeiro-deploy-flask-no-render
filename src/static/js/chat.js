// Atualização do script para integração real com o backend
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.querySelector('.chat-messages');
    const chatForm = document.querySelector('.chat-form');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    // Função para adicionar mensagem ao chat
    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const messageText = document.createElement('div');
        messageText.classList.add('message-text');
        messageText.textContent = message;
        
        const messageTime = document.createElement('div');
        messageTime.classList.add('message-time');
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        messageTime.textContent = `${hours}:${minutes}`;
        
        messageElement.appendChild(messageText);
        messageElement.appendChild(messageTime);
        
        chatMessages.appendChild(messageElement);
        
        // Rolar para a mensagem mais recente
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Mensagem de boas-vindas do chatbot
    setTimeout(() => {
        addMessage('Olá! Sou o AquaSaber, seu assistente para consultas sobre abastecimento hídrico. Como posso ajudar você hoje?');
    }, 500);

    // Enviar mensagem quando o formulário for enviado
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = chatInput.value.trim();
        if (message !== '') {
            // Adicionar mensagem do usuário
            addMessage(message, true);
            
            // Limpar input
            chatInput.value = '';
            
            // Mostrar indicador de digitação
            showTypingIndicator();
            
            // Enviar mensagem para o backend
            sendMessageToBackend(message);
        }
    });

    // Mostrar indicador de "digitando..."
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'bot-message', 'typing-indicator');
        typingElement.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remover indicador de digitação
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Enviar mensagem para o backend
    async function sendMessageToBackend(message) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            
            // Remover indicador de digitação
            removeTypingIndicator();
            
            // Adicionar resposta do chatbot
            if (data.status === 'success') {
                addMessage(data.message);
            } else {
                addMessage('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            
            // Remover indicador de digitação
            removeTypingIndicator();
            
            // Mostrar mensagem de erro
            addMessage('Desculpe, não foi possível conectar ao servidor. Por favor, verifique sua conexão e tente novamente.');
        }
    }

    // Permitir envio ao pressionar Enter
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
