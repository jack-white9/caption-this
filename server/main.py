from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from classes.ImageCaptioningModel import ImageCaptioningModel
from classes.LargeLanguageModel import LargeLanguageModel


app = FastAPI()
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {"message": "Health check status: OK"}


# TODO: how will we take an image as a parameter?
@app.get("/generate_caption")
async def generate_caption(image):
    image_description = ImageCaptioningModel().generate_image_description(image)
    caption = LargeLanguageModel().generate_caption(image_description)
    return {"response": caption}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
