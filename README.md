# VESIT Admission Chatbot

Chatbot for VESIT Admission Website

## Initial Setup:
This repo currently contains the starter files.

Clone repo and create a virtual environment
```
$ git clone https://github.com/VKrishna2090/vesit-admission-chatbot.git
$ cd vesit-admission-chatbot
```
Install dependencies
```
$ pip install Flask torch torchvision nltk
```
Install nltk package
```
$ python
>>> import nltk
>>> nltk.download('punkt')
```
Run
```
$ python train.py
```
This will dump data.pth file. And then run
the following command to test it in the console.
```
$ python chat.py
```
# Contributors
- Aamir Ansari
- Ninad Rao
- V Krishnasubramaniam