# SenTag

![image](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green) 
![image](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D) 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


SenTag is a light-weight web-based platform for **text annotation**.

The platform allows **multiple users** to cooperate in the annotation of a corpus of documents. 

The output of the annotation process is an **XML** file that can be validated against a schema for **quality** guarantees.

## Usage (for local deployment)

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

    - Create default Groups (namely Admins, Editors, Annotators) and assign the superuser to them
    ```
    python manage.py createdefaultgroups <superuser_name>
    ```

    - Start the development server:
    ```
    python manage.py runserver
    ```
    

2. Open another terminal and start the server for the UI

    ```
    cd ui
    yarn install
    yarn serve
    ```

Now visit [http://127.0.0.1:8000](http://127.0.0.1:8000) and log in with your credentials for complete access to all functionalities!

## Major Dependencies
- Annotation interface: [NER-annotator for Spacy](https://github.com/tecoholic/ner-annotator) (MIT Licence)

- Graph: [DevExtreme by DevExpress](https://github.com/DevExpress/devextreme-vue) (MIT License)

- Agreement: [Simpledorff](https://github.com/LightTag/simpledorff) (MIT License)

## Video Presentation
* [Video Demonstrations of the Program Functionalities](https://www.loreggia.eu/download/sentag.mp4) 

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
