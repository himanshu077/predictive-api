# Predictive Chatbot

This project is a predictive chatbot built with [Node.js](https://nodejs.org/en) and [Express.js](https://expressjs.com/). It uses the [natural](https://www.npmjs.com/package/natural) library to compare user questions with data stored in a JSON file and provide appropriate answers.

## Tech Stack Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side development.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.
- **Natural**: A Node.js library for natural language processing, used to handle text analysis and question matching.
- **JSON**: A lightweight data interchange format used to store and structure the chatbot's question-answer data.
- **npm**: The Node.js package manager used to manage project dependencies.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/himanshu077/predictive-api.git
   cd predictive-api
   ```

2. **Install Dependencies**

  ```bash
npm install
 ```
3. **Configure Environment Variables**
    
    Create `.env` file in the root of the project and put
    
```bash
PORT=3000
```
4. **Run the Server**
```bash
npm start
```
5. **Testing the API**
Use a tool like Postman or curl to test the API endpoints. You can send requests to the following URL to interact with the chatbot
6. **URL**
```bash
http://localhost:3000/ask
```
7. **Request Format**
- Send data in the request body in JSON format. For example:
```bash
{
  "question": "capital of india?"
}
```

