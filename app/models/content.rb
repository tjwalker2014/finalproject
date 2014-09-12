class Content < ActiveRecord::Base
  attr_accessible :dislikes, :likes, :title, :type, :url

  has_many :favourites, dependent: :destroy
  has_many :users, through: :favourites 
end
