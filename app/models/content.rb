class Content < ActiveRecord::Base
  attr_accessible :author, :title, :type, :url, :user_id

  # has_many :favourites, dependent: :destroy
  # has_many :users, through: :favourites

  belongs_to :user
end
