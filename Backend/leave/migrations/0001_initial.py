# Generated by Django 5.2.4 on 2025-07-11 16:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('nom_roll', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Leave',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leave_type', models.CharField(max_length=50)),
                ('leave_starts', models.DateField()),
                ('leave_ends', models.DateField()),
                ('file_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='nom_roll.employee')),
            ],
        ),
    ]
