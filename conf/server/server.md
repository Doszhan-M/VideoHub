sudo apt install supervisor vim -y

sudo vim /etc/supervisor/conf.d/internet_check.conf

[program:internet_check]
command=sudo python3 /home/boxroom/github/VideoHub/conf/server/check_internet.py 
autostart=true
autorestart=true

sudo supervisorctl reread   
sudo supervisorctl update
sudo supervisorctl restart all
