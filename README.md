# Sentag

- Django backend

- Vue.js frontend, inspired by [NER-annotator for Spacy](https://github.com/tecoholic/ner-annotator)

## usage (for development)

1. Install the dependencies and start the Python Backend server

```sh
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver 
```

2. Open another terminal and start the server for the UI

```sh
cd ui
yarn install
yarn serve
```

Now go to [http://localhost:8000](http://localhost:8000)
