# RabbitMQ Docker Üzerinden Ubuntu'ya Kurulumu

Bu README dosyası, RabbitMQ'nun Docker üzerinden Ubuntu işletim sistemine kurulumunu adım adım anlatmaktadır.

## Gereksinimler

- Docker'ın kurulu olması gerekmektedir. Docker'ı [resmi web sitesinden](https://www.docker.com/get-started) indirebilirsiniz.

## Kurulum Adımları

1. **Docker Kurulumu**: Eğer bilgisayarınızda Docker yüklü değilse, Docker'ı yükleyin.

2. **RabbitMQ Docker İmajının İndirilmesi**: Terminal veya komut istemcisini açın ve aşağıdaki komutu çalıştırın:

    ```bash
    docker pull rabbitmq
    ```

3. **RabbitMQ Konteynerinin Oluşturulması ve Çalıştırılması**: Aşağıdaki komutu çalıştırarak RabbitMQ konteynerını başlatın:

    ```bash
    docker run -d --name my-rabbit -p 5672:5672 -p 15672:15672 rabbitmq
    ```

    - `-d`: Konteynerı arka planda çalıştırır.
    - `--name my-rabbit`: Konteynera bir isim verir.
    - `-p 5672:5672`: RabbitMQ'nun kullanacağı port.
    - `-p 15672:15672`: RabbitMQ yönetim arayüzünün kullanacağı port.

4. **RabbitMQ Yönetim Arayüzüne Erişim**: Tarayıcınızı açın ve `http://localhost:15672` adresine gidin. Kullanıcı adı ve şifre olarak varsayılan olarak "guest" kullanıcı adı ve şifresini kullanabilirsiniz.

5. **Konteyner Durdurma ve Kaldırma**: RabbitMQ konteynerını durdurmak için:

    ```bash
    docker stop my-rabbit
    ```

    Konteynerı silmek için:

    ```bash
    docker rm my-rabbit
    ```

    > Not: "my-rabbit" yerine kullandığınız ismi kullanın.

6. **Proje Dizini Oluşturma ve Geçiş Yapma**: Terminal veya komut istemcisinde aşağıdaki komutları kullanarak bir proje dizini oluşturun ve bu dizine geçin:

    ```bash
    mkdir rabbitmq-nodejs
    cd rabbitmq-nodejs
    ```

7. **Npm İle Yeni Proje Başlatma**: Proje dizinindeyken, npm ile yeni bir proje başlatın. Bu, `package.json` dosyasını oluşturacaktır:

    ```bash
    npm init -y
    ```

8. **amqp Modülünü Yükleme**: amqp modülünü projenize ekleyin. Bu, RabbitMQ'ya Node.js üzerinden erişmek için gereklidir:

    ```bash
    npm install amqp
    ```
## Proje Komutları

Proje dosyalarını çalıştırmak için aşağıdaki komutları kullanabilirsiniz:
  -package.json dosyasının içine aşapıdaki komutu yapıştırın.
  "scripts": {
    "publisher": "node publisher.js",
    "consumer": "node consumer.js"
  }

- **Publisher (Yayımcı)**: RabbitMQ'ya mesaj göndermek için kullanılır.
  
  ```bash
  npm run publisher
  ```

- **Consumer (Tüketici)**: RabbitMQ'dan mesajları almak için kullanılır.
  
  ```bash
  npm run consumer
  ```
