<p align="center"><b>DEMO</b></p>

[<img src="https://github.com/mrxbroken011/mrxbroken011/raw/main/resources/Ss.jpg"/>](https://github.com/mrxbroken011)

<p1 alig=="center"> 𝐅𝐎𝐑𝐊 𝐑𝐄𝐂𝐎𝐌𝐌𝐄𝐍𝐃𝐄𝐃</p>


## Deployment

You can deploy this Next.js application to a variety of platforms. Here are instructions for some common options.

### Deploying to Vercel

Vercel is a platform from the creators of Next.js and is one of the easiest ways to deploy your application.

1.  **Push to a Git Repository**: Push your code to a GitHub, GitLab, or Bitbucket repository.
2.  **Import Project on Vercel**: Go to your Vercel dashboard and import the project from your Git repository.
3.  **Configure Project**: Vercel will automatically detect that you are using Next.js and configure the build settings for you.
4.  **Add Environment Variables**: If your application requires environment variables (e.g., API keys), add them in the "Environment Variables" section of your project settings on Vercel. You will need to set `GEMINI_API_KEY` for the AI features to work.
5.  **Deploy**: Click the "Deploy" button. Your application will be built and deployed. Vercel will provide you with a URL to access your live site.

### Deploying to a VPS or Node.js Server

You can also deploy this application to any Virtual Private Server (VPS) or a server with Node.js support.

1.  **Setup Your Server**: Ensure your server has Node.js (version 18.x or higher) and npm installed.
2.  **Clone Your Repository**: Clone your code onto the server.
    ```bash
    git clone https://github.com/mrxbroken011/code-assistant.git
    cd code-assistant
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Set Environment Variables**: Create a `.env.local` file in the root of your project and add your environment variables.
    ```
    GEMINI_API_KEY=your_gemini_api_key
    ```
5.  **Build Your Application**:
    ```bash
    npm run build
    ```
6.  **Start the Server**:
    ```bash
    npm run start
    ```
    This will start the production server on port 3000 by default.

#### Using a Process Manager

For a production environment, it is highly recommended to use a process manager like `pm2` to keep your application running continuously.

1.  **Install pm2 globally**:
    ```bash
    npm install pm2 -g
    ```
2.  **Start your app with pm2**:
    ```bash
    pm2 start npm --name "my-next-app" -- run start
    ```
3.  **Save the process list**:
    ```bash
    pm2 save
    ```
4.  **Setup startup script** (to automatically restart on server reboot):
    ```bash
    pm2 startup
    ```
    This will provide a command you need to run to complete the setup.
