# caption-this

Uses BLIP + GPT 3.5 to generate Instagram captions for photos.

## Models

- [Salesforce BLIP Image Captioning](https://huggingface.co/Salesforce/blip-image-captioning-large)
- [OpenAI GPT 3.5](https://platform.openai.com/docs/models/gpt-3-5)

## Installation

To run locally, clone the project repository use the following installation steps:

### Server

1. Change directory to server: `cd server`
2. Install project dependencies: `pip install -r requirements.txt`
3. Add OpenAI API key: `export OPENAI_API_KEY='<insert api key>'`
4. Start the FastAPI server: `uvicorn app.main:app --host 0.0.0.0  --port 8000 --reload`

### Client

1. Change directory to client: `cd client`
2. Install project dependencies: `npm install`
3. Start the React frontend: `npm start`
4. Access the client on `http://localhost:3000`

## Roadmap

- [x] Create localhost web app
- [x] Migrate app to AWS
- [x] Upgrade frontend to TypeScript
- [x] Add CI/CD pipeline
- [ ] Uplift UI
