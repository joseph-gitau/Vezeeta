# Generated by Django 4.2.2 on 2023-07-11 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('default', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('mobile_number', models.CharField(max_length=100)),
                ('specialty', models.CharField(max_length=100)),
                ('license_number', models.CharField(max_length=100)),
                ('affiliation', models.CharField(blank=True, max_length=100)),
                ('experience', models.CharField(blank=True, max_length=100)),
                ('education', models.TextField(blank=True)),
                ('language_proficiency', models.CharField(blank=True, max_length=100)),
                ('professional_certifications', models.TextField(blank=True)),
                ('profile_picture', models.ImageField(blank=True, upload_to='doctor_profiles/')),
            ],
        ),
    ]
