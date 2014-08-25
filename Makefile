app_dir = /srv/nodejs/bold
temp_install_dir = /tmp/bold

install :
	sudo mkdir -p $(app_dir)
	sudo cp ./app.js $(app_dir)/app.js
	sudo cp ./package.json $(app_dir)/package.json
	sudo cp -r ./bin ./lib ./public ./routes ./node_modules ./views $(app_dir)
	sudo cp ./bold.conf /etc/init/bold.conf

deploy :
	make install
	make start_app

start_app :
	sudo (start  --no-wait -q bold || (stop bold && start --no-wait -q bold)