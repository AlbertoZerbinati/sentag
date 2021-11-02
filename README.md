# SenTag

- Django backend

- Vue.js frontend, inspired by [NER-annotator for Spacy](https://github.com/tecoholic/ner-annotator) (MIT Licence)

- Graph featuring [DevExtreme by DevExpress](https://github.com/DevExpress/devextreme-vue) (MIT License)

- Python Package for agreement: [Simpledorff](https://github.com/LightTag/simpledorff) (MIT License)

## Usage (for development)

1. Install the dependencies, create the Database and the Admin User, start the Python Backend server
    * Install the dependencies in a new python virtual environment
    ```
    python -m venv env
    source env/bin/activate
    pip install -r requirements.txt
    ```

    * Create the sqlite database
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```

    - Create a superuser
    ```
    python manage.py createsuperuser
    ```

    - Start the development server:
    ```
    python manage.py runserver
    ```
    

2. Create Groups from the Admin-Page
    * Now visit [http://localhost:8000](http://localhost:8000). Log into the website as admin user. Access to the Admin-Page and add Admins and Editors Groups (through the UI), with appropriate permissions. Remember to add your user to both these newly created groups.

3. Open another terminal and start the server for the UI

    ```
    cd ui
    yarn install
    yarn serve
    ```

And finally we have complete access to all functionalities!

## Paper
**SenTag: a Web-based Tool for Semantic Annotation of Textual Documents**
* A. Loreggia, S. Mosco, and A. Zerbinati. *"SenTag: a Web-based Tool for Semantic Annotation of Textual Documents"* - To appear in Proceedings of the 36th AAAI Conference on Artificial Intelligence 2022 - Demonstrations Program Track 

* Video about the demo presented at AAAI 2022 - Demonstrations Program Track 

### How to cite
```
@article{sentag2021,
  author = {Loreggia, Andrea and Mosco, Simone and Zerbinati, Alberto},
  journal = {AAAI 2022 - Demonstrations Program},
  booktitle={Proceedings of the 36th AAAI Conference on Artificial Intelligence 2022},
  year={2022},
  title = {SenTag: a Web-based Tool for Semantic Annotation of Textual Documents}
}
```