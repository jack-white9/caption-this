from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from classes.ImageCaptioningModel import ImageCaptioningModel
from classes.LargeLanguageModel import LargeLanguageModel
from PIL import Image
import io


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


@app.post("/generate_caption/")
async def create_upload_file(file: UploadFile = File(...)):
    file.filename = 'test.jpeg'
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    image_description = ImageCaptioningModel().generate_image_description(image)
    caption = LargeLanguageModel().generate_caption(image_description)
    return {"image_description": caption}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
