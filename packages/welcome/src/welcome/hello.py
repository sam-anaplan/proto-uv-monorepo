import pyfiglet

def get_hello():
    return {
        "message": "Hello there!",
        "figlet": pyfiglet.figlet_format("Hello!") }
