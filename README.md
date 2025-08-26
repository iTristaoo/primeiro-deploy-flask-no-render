# Documentação do Site AquaSaber

## Visão Geral
O site AquaSaber é uma plataforma web moderna e minimalista que integra um chatbot educacional para consulta de abastecimento hídrico. O site foi desenvolvido utilizando Flask para o backend e HTML/CSS/JavaScript para o frontend, seguindo um design responsivo que funciona em dispositivos móveis e desktop.

## Estrutura do Projeto
```
aquasaber-site/
├── requirements.txt      # Dependências do projeto
├── src/
│   ├── main.py          # Ponto de entrada da aplicação Flask
│   ├── models/          # Modelos de dados (para expansão futura)
│   ├── routes/          # Rotas da API (para expansão futura)
│   └── static/          # Arquivos estáticos
│       ├── css/
│       │   ├── style.css       # Estilos principais
│       │   └── responsive.css  # Estilos responsivos e animações
│       ├── js/
│       │   └── chat.js         # Lógica do chat
│       └── index.html          # Página principal
└── venv/                # Ambiente virtual Python (não incluído no zip)
```

## Funcionalidades Principais
1. **Interface de Chat Interativa**: Interface moderna para comunicação com o chatbot AquaSaber
2. **Design Responsivo**: Adaptação automática para diferentes tamanhos de tela
3. **Integração Backend-Frontend**: Comunicação assíncrona entre interface e servidor
4. **Simulação de RAG**: Preparado para integração com o sistema RAG existente
5. **Abordagem Educacional**: O chatbot não apenas fornece respostas diretas, mas explica o processo de consulta, ensinando os usuários a buscarem e interpretarem informações de forma autônoma

## Como Executar o Projeto

### Requisitos
- Python 3.8 ou superior
- Pip (gerenciador de pacotes Python)

### Passos para Execução
1. Extraia o arquivo zip em um diretório de sua preferência
2. Crie um ambiente virtual Python:
   ```
   python -m venv venv
   ```
3. Ative o ambiente virtual:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
4. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```
5. Execute a aplicação:
   ```
   python src/main.py
   ```
6. Acesse o site em seu navegador: `http://localhost:5000`

## Integração com o Chatbot Existente
Para integrar o chatbot AquaSaber existente com RAG, modifique a função `process_message_with_rag()` no arquivo `src/main.py` para conectar-se ao seu sistema RAG atual.

## Personalização
- **Cores e Estilos**: Edite os arquivos CSS em `src/static/css/`
- **Comportamento do Chat**: Modifique o arquivo `src/static/js/chat.js`
- **Conteúdo da Página**: Atualize o arquivo `src/static/index.html`

## Suporte e Contato
Para suporte ou dúvidas sobre o site, entre em contato com o desenvolvedor.
