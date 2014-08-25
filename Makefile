app_dir = /srv/nodejs/bold
temp_install_dir = /tmp/bold

install :
	sudo mkdir -p $(app_dir)
	sudo cp ./app.js $(app_dir)/app.js
	sudo cp ./package.json $(app_dir)/package.json
	sudo cp -r ./bin ./lib ./public ./routes ./node_modules ./views $(app_dir)
	sudo cp ./bold.conf /etc/init/bold.conf

deploy :
	# Get rid of old temp installs
	ssh $(deployment_hostname) sudo rm -rf $(temp_install_dir)
	# Copy files over to remote machine
	rsync -r . $(deployment_hostname):$(temp_install_dir)
	# Install our app to the right location
	ssh $(deployment_hostname) cd $(temp_install_dir)\; make install
	ssh $(deployment_hostname) cd $(temp_install_dir)\; make start_app

start_app :
	sudo start  --no-wait -q hello_world