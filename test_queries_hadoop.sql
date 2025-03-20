# Создание директории в HDFS
hdfs dfs -mkdir -p /user/runner/test_dir

# Проверка, что директория создана
hdfs dfs -ls /user/runner

# Создание тестового файла локально
echo "Hello, Hadoop!" > local_test_file.txt

# Загрузка тестового файла в HDFS
hdfs dfs -put local_test_file.txt /user/runner/test_dir/

# Проверка, что файл загружен
hdfs dfs -ls /user/runner/test_dir

# Чтение содержимого файла из HDFS
hdfs dfs -cat /user/runner/test_dir/local_test_file.txt

# Подсчет строк в файле
hdfs dfs -cat /user/runner/test_dir/local_test_file.txt | wc -l

# Удаление файла из HDFS
hdfs dfs -rm /user/runner/test_dir/local_test_file.txt

# Проверка, что файл удален
hdfs dfs -ls /user/runner/test_dir
