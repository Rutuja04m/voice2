import speech_recognition as sr
import pyttsx3

# Initialize TTS engine
engine = pyttsx3.init()
engine.setProperty('rate', 180)  # Speaking speed

def recognize_speech():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()

    with mic as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source, timeout=5)

    try:
        text = recognizer.recognize_google(audio)
        print("Recognized:", text)
        return text
    except sr.UnknownValueError:
        raise Exception("Could not understand audio.")
    except sr.RequestError as e:
        raise Exception(f"Speech recognition error: {e}")

def speak_text(text):
    engine.say(text)
    engine.runAndWait()
