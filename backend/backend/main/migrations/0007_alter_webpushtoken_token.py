# Generated by Django 4.1.3 on 2022-11-28 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_webpushtoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='webpushtoken',
            name='token',
            field=models.TextField(unique=True),
        ),
    ]
