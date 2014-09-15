class Favourite < ActiveRecord::Base
  attr_accessible :content_id, :user_id

  belongs_to :user
  belongs_to :content
end
