#
# Cookbook:: setup-aws-cert-univ
# Recipe:: default
#
# Copyright:: 2018, The Authors, All Rights Reserved.

git "~/aws-cert-univ" do
  repository "git://github.com/waura/aws-cert-univ.git"
  reference "master"
  action :sync
end
