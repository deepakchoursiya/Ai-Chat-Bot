# BotSphere - Virtual Assistant & Chatbot Platform

A full-stack web application that enables businesses to manage virtual assistants and chatbots across multiple channels.

## Features

- 💬 Customer Support Chatbot Portal with NLP-powered responses
- 🎨 Modern UI with dark/light mode toggle
- 📊 Dashboard with analytics and quick actions
- 🔄 Real-time chat interface with typing indicators
- 🌐 Cross-origin resource sharing (CORS) support

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3
- Spring AI (Azure OpenAI integration)
- Spring Security
- Spring Data JPA
- H2 Database (in-memory)

### Frontend
- React 18+
- Vite
- Tailwind CSS
- React Router
- Axios

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6+

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure Azure OpenAI in `src/main/resources/application.yml`:
   ```yaml
   spring:
     ai:
       azure:
         openai:
           endpoint: https://your-endpoint.openai.azure.com/
           api-key: your-api-key
           chat:
             options:
               model: gpt-4
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## API Endpoints

- `POST /api/chat/message` - Send a message to the chatbot

## Project Structure

```
BotSphere/
├── backend/
│   ├── src/main/java/com/botsphere/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── entity/         # JPA entities
│   │   ├── dto/           # Data transfer objects
│   │   └── config/        # Configuration classes
│   └── src/main/resources/
│       └── application.yml # Application configuration
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   └── hooks/         # Custom hooks
    └── public/           # Static assets
```

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Navigate to the Chat section to interact with the AI-powered chatbot
4. View dashboard for analytics and quick actions

## Configuration

Update the Azure OpenAI configuration in `backend/src/main/resources/application.yml` with your actual endpoint and API key from Pluralsight.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request# Ai-Chat-Bot
