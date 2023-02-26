Resume Dyno
===========================

Transform your resume into dynamic JSON with Resume Dyno, a **Chrome extension** designed to work with **ChatGPT**. 

> With Resume Dyno, you can choose a JSON schema, modify it as needed, and select a PDF resume to create a dynamic JSON output.

![image](https://user-images.githubusercontent.com/42273436/221424682-b9e79148-3a90-49b5-8b68-90e92ded42f4.png)


🚀 Deployment
----------

To deploy the extension, follow these steps:

1.  Clone the GitHub repository for Resume Dyno.
    
2.  Navigate to the project directory and install the necessary dependencies by running `npm install`.
    
3.  Build the project by running `npm run build`. This will create a `build` directory with the extension code.
    
4.  Open Google Chrome and navigate to `chrome://extensions`.
    
5.  Enable Developer mode by toggling the switch in the top right corner.
    
6.  Click the "Load unpacked" button and select the `build` directory from step 3.
    
7.  The Resume Dyno extension should now be installed and ready to use on [https://chat.openai.com/](https://chat.openai.com/).

To deploy the backend, follow these steps:

1.  Clone the GitHub repository for Resume Dyno.
2.  Run the following commands to install the necessary dependencies and start the server:
	
	```bash
	pip install -r requirements.txt
	uvicorn main:app --reload
	```
3.  The backend should now be running on port 8000.
4.  Setup a reverse proxy to forward requests to the backend.
    

🛠️ Technologies Used
-----------------

ResumeDyno is built using ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) and ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white), and the backend is built with ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) and Uvicorn. It is designed to run on a ![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black) server behind a reverse proxy.

Thanks to [JohnBra](https://github.com/JohnBra) for the [chrome extension boilerplate](https://github.com/JohnBra/vite-web-extension)

📝 License
-------

This project is licensed under the MIT License - see the LICENSE file for details.
