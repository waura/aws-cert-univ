# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "centos7"
  config.vm.box_url = "https://github.com/holms/vagrant-centos7-box/releases/download/7.1.1503.001/CentOS-7.1.1503-x86_64-netboot.box"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.synced_folder "./client", "/home/vagrant/client"
  config.vm.synced_folder "./server", "/home/vagrant/server"

  config.vm.provision "chef_zero" do |chef|
    chef.version = '12.19.36'
    chef.cookbooks_path = ["chef-repo/cookbooks"]
    chef.data_bags_path = "chef-repo/data_bags"
    chef.roles_path = "chef-repo/roles"
    chef.nodes_path = "./chef-repo/cookbooks"
    chef.run_list = [
      "recipe[iptables::disabled]",
      "recipe[firewall::disable_firewall]",
      "role[web]",
      "role[db]"
    ]
  end
end
