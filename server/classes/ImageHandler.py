import base64


class ImageHandler:
    def encode_image(image):
        with open(image, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            return encoded_string

    def decode_image(encoded_image):
        with open("decoded_img.png", "wb") as fh:
            fh.write(base64.b64decode(encoded_image))
        return
