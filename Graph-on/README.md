##Starting Grafana##

1. install grafana "brew install grafana"
2. start grafana "brew services start grafana"
3. navigate to localhost:3000
4. Username and Passowrd should be "admin"
5. Click on "Add data source", add prometheus
6. Oh snap now you need a prometheus Url
7. Okay u got it
8. create an Iframe with the public dashboard URL!! "http://localhost:3000/public-dashboards/92032ef9b30446eb83b9482ebbe059d7"
9. configure the grafana.ini to allow for iframes
10. 