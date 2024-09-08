# NEXTOPIC

NEXTOPIC is a web application that mimics the ChatGPT user interface, built with React and Redux. It's designed to work with a backend that can call the OpenAI API to generate responses.

## Screen Shots

![image](https://github.com/user-attachments/assets/8a756312-580f-45df-b35d-a37c465fb6f4)

![image](https://github.com/user-attachments/assets/9f11090a-69a8-4507-9d2c-d0272cec5386)

## Features

- ChatGPT-like user interface
- Real-time stream response
- Built with React for a responsive and interactive frontend
- State management with Redux
- Work with a [backend](https://github.com/lacser/NEXTOPICHost) to call OpenAI API

## To-Do

Here's a list of planned features and improvements for future development:

- [ ] Enable chat mode switching functionality
- [ ] Add the ability to delete individual messages and clear all chat history
- [ ] Add a settings page
- [ ] Implement user authentication with multiple login options
  - [ ] Login with Google
  - [ ] Login with Email
- [ ] Support cloud synchronization of chat history

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or later)
- npm (usually comes with Node.js)
- Your OpenAI API KEY

## Quick Start

To install NEXTOPIC, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/nextopic.git
   ```

2. Navigate to the project directory:

   ```
   cd nextopic
   ```

3. Install the dependencies:

   ```
   npm install
   ```

NEXTOPIC must be used with its back end, go [NEXTOPIC Host](https://github.com/lacser/NEXTOPICHost) for more instructions.

## Usage

1. Set the PORT environment variable to avoid conflicts with the backend: On Unix-like systems (Linux, macOS):

   ```bash
   export PORT=3001
   ```

   On Windows (PowerShell):

   ```powershell
   $env:PORT = "3001"
   ```

2. Start the development server:

   ```powershell
   npm start
   ```

3. If not opened automatically, visit `http://localhost:3001` in your browser.

## Configuration

To persist the PORT environment variable, make a new file named `.env.local` and paste the following code.

```javascript
PORT=3001
```

## Contributing

NEXTOPIC is a personal project created for demonstration purposes only. As such, it is not actively seeking contributions. However, you're welcome to fork the repository and modify it for your own use or learning purposes.

If you have suggestions or find issues, feel free to open an issue in the GitHub repository. While I may not be able to address all suggestions, I appreciate your interest and feedback!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
