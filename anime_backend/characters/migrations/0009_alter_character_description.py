# Generated by Django 5.2.1 on 2025-07-25 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0008_character_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='description',
            field=models.TextField(default='desc'),
        ),
    ]
