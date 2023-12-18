##Starting Grafana##

1. install grafana "brew install grafana"
2. start grafana "brew services start grafana"
3. navigate to localhost:3000
4. Username and Passowrd should be "admin"
5. Click on "Add data source", add prometheus
6. Oh snap now you need a prometheus Url
7. Okay u got it
8. create an Iframe with the public dashboard URL!! "http://localhost:3000/public-dashboards/92032ef9b30446eb83b9482ebbe059d7"
9. configure the grafana.ini to allow for iframes (need to tell it what the homepath is and where your config file is) and make sure Grafana has been stopped before doing so!
 "grafana server --homepath /opt/homebrew/opt/grafana/share/grafana --config=/opt/homebrew/opt/grafana/share/grafana/conf/grafana.ini"
 10. "/opt/homebrew/opt/grafana/share/grafana/conf/defaults.ini"



grafanaserver --config=/opt/homebrew/opt/grafana/share/grafana/conf/grafana.ini

##Stopping Grafana##
1. 'brew services stop grafana'
