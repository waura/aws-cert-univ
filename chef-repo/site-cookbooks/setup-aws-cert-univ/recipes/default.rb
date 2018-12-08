#
# Cookbook:: setup-aws-cert-univ
# Recipe:: default
#
# Copyright:: 2018, The Authors, All Rights Reserved.

include_recipe "git::default"

user "acu" do
  home "/home/acu"
  shell "/bin/bash"
  password nil
  home "/home/acu"
  manage_home true
  action :create
end

group "acu" do
  gid 1010
  members ['acu']
  action :create
end

directory "/var/www" do
  owner "acu"
  group "acu"
  recursive true
  mode 0755
  action :create
  not_if { File.exists? "/var/www" }
end

git "/var/www/aws-cert-univ" do
  user 'acu'
  group 'acu'
  repository "git://github.com/waura/aws-cert-univ.git"
  reference "master"
  action :sync
end

bash "build aws-cert-univ client" do
  user 'acu'
  group 'acu'
  cwd '/var/www/aws-cert-univ/client'
  environment(
   "HOME" => "/home/acu",
   "NODE_ENV" => "production",
   'PATH' => '$PATH:/usr/bin:/usr/local/bin'
  )  
  code <<-EOC
      npm install
      npm run build
  EOC
end

bash "build aws-cert-univ server" do
  user 'acu'
  group 'acu'
  cwd '/var/www/aws-cert-univ/server'
  environment(
   "HOME" => "/home/acu",
   "NODE_ENV" => "production",
   'PATH' => '$PATH:/usr/bin:/usr/local/bin'
  )  
  code <<-EOC
      npm install
  EOC
end
