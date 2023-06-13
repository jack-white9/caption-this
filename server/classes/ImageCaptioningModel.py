from transformers import pipeline


class ImageCaptioningModel:
    def __init__(self):
        self.captioner = pipeline(
            "image-to-text",
            model="Salesforce/blip-image-captioning-base"
        )

    def generate_image_description(self, image):
        image_description = self.captioner(image)[0]["generated_text"]
        return image_description
