import os
import zipfile
import pandas as pd
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, count

# Функция для загрузки датасета с Kaggle
def download_kaggle_dataset():
    os.system("pip install kaggle")
    os.makedirs("data", exist_ok=True)
    os.environ['KAGGLE_USERNAME'] = os.getenv('KAGGLE_USERNAME')
    os.environ['KAGGLE_KEY'] = os.getenv('KAGGLE_KEY')
    os.system("kaggle datasets download -d chekalinanina/netflix-titles -p data --unzip")

# Загрузка датасета
download_kaggle_dataset()

# Создание SparkSession
spark = SparkSession.builder \
    .appName("Netflix Data Analysis") \
    .getOrCreate()

# Загрузка данных из CSV
df = spark.read.csv("data/netflix_titles.csv", header=True, inferSchema=True)

# Показать схему данных
df.printSchema()

# Показать первые 5 строк
df.show(5)

# Фильтрация данных: получить все фильмы, выпущенные после 2015 года
recent_movies = df.filter(col("release_year") > 2015)
recent_movies.show()

# Подсчет количества фильмов по жанрам
genre_count = df.groupBy("listed_in").agg(count("*").alias("count")).orderBy(col("count").desc())
genre_count.show()

# Подсчет среднего времени просмотра по типу шоу
avg_duration = df.groupBy("type").agg(avg("duration").alias("avg_duration"))
avg_duration.show()

# Сохранение результатов в JSON файл
output_path = "output/results.json"
avg_duration.write.json(output_path)

# Завершение работы SparkSession
spark.stop()
