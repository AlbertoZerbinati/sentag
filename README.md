# SenTag

- Django backend

- Vue.js frontend, inspired by [NER-annotator for Spacy](https://github.com/tecoholic/ner-annotator) (MIT Licence)

- Graph featuring [DevExtreme by DevExpress](https://github.com/DevExpress/devextreme-vue) (MIT License)

## Usage (for development)

1. Install the dependencies, create the Database, the Admin User and start the Python Backend server
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

    - Create your own superuser
    ```
    python manage.py createsuperuser
    ```

    - Once this command completes start the development server:
    ```
    python manage.py runserver
    ```
    

2. Create Groups from the Admin-Page
    * Now we can log into the website as admin user.
We have access to the Admin-Page, where we should add Admins and Editors Groups (through the UI), with appropriate permissions.
Remember to add your user to both these newly created groups.

   And finally we have complete access to all functionalities!

3. OPTIONAL - if developing the frontend, open another terminal and start the server for the UI

    ```
    cd ui
    yarn install
    yarn serve
    ```

Now go to [http://localhost:8000](http://localhost:8000)
