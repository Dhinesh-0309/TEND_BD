FROM python:3.10-slim

WORKDIR /app

# Don't reference 'backend/' here — you're already in backend/
COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
