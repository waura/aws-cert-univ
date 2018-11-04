#
# Cookbook:: mkdir-mongodb
# Recipe:: default
#
# Copyright:: 2018, The Authors, All Rights Reserved.

execute "make directory to avoid a issue" do
  command "sudo install -d -m 0777 /var/run/mongodb"
  action :run
end
