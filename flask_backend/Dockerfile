FROM python
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "app.py", "--port=8000"]