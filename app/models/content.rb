class Content < ActiveRecord::Base
  attr_accessible :author, :title, :type, :url, :user_id

  # has_many :favourites, dependent: :destroy
  # has_many :users, through: :favourites

  belongs_to :user

  # scope :top_five, group('id').order('count_title DESC').limit(5).count('title').map{ |id, count| self.find(id)}

  scope :top_five, lambda {group('id').order('count_title DESC').limit(5).count('title').map{ |id, count| self.find(id)}}
end
