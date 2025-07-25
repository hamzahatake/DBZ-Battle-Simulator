# Generated by Django 5.2.1 on 2025-07-25 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0009_alter_character_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='form',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='role',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='saga',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='special_move',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='strengths',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='type',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='ultimate_move',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='weaknesses',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
