# Generated by Django 3.1.7 on 2021-04-02 09:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tag_sentenze', '0017_sentenza_intial_text'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sentenza',
            old_name='intial_text',
            new_name='initial_text',
        ),
    ]
