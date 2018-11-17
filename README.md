
This is a web site for practicing aws certification.

## Create a config file of Third party authentication

```
$ cd aws-cert-univ/server
$ cp providers.json.template providers.json
```

## Start server

### create a virtual machine for development
```
$ cd aws-cert-univ/chef-repo
$ berks vendor cookbooks
$ cd ../
$ vagrant up
```

### start API server
```
$ vagrant ssh
$ cd server
$ npm install
$ npm start
```

### start client server
```
$ vagrant ssh
$ cd client
$ npm install
$ npm start
```
