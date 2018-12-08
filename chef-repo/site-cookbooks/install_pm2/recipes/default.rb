#
# Cookbook:: install_pm2
# Recipe:: default
#
# Copyright:: 2018, The Authors, All Rights Reserved.

execute 'install pm2' do
  command 'npm install -g pm2'
  environment(
    'PATH' => '$PATH:/usr/local/bin'
  )
end