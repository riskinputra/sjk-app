# sjk-app
Aplikasi Surat Jalan Kendaraan

1. Install dependencies
```
npm install
```

2. Migrate menggunakan sequelize cli
```
sequelize db:migrate
sequelize db:seed:all
```

3. login dengan username
```
admin:admin
```

4. setup env untuk kirim email (harus gmail)
4.1 set env lokal
```
#set:
export USERNAME_EMAIL=username@gmail.com
export PASSWORD_EMAIL=password

#view:
echo $USERNAME_EMAIL
echo $PASSWORD_EMAIL
```

4.2 set env heroku
```
#set:
heroku config:set USERNAME_EMAIL=username@gmail.com
heroku config:set PASSWORD_EMAIL=password

#view:
heroku config
```

5. logs heroku
```
heroku logs
```

faris - riski
miracle fox 2017