
This is a web site for practicing aws certification.

## Create a config file of Third party authentication

```
$ cd aws-cert-univ/server
$ cp providers.json.template providers.json
```

## Start server

### create a virtual machine for development
```
$ cd aws-cert-univ/server/chef-repo
$ berks vendor cookbooks
$ cd ../
$ vagrant up
$ vagrant ssh
```

### start API server
```
$ cd aws-cer-univ-server
$ npm install
$ npm start
```
