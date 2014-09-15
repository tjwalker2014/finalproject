class Favourite < ActiveRecord::Base
  attr_accessible :content_id, :user_id

  belongs_to :user
  belongs_to :content

  # before_save :find_or_create_content
  # after_save :increment_content_count

  # def find_or_create_content
  #   # @content = Content.find_by_url("url blah")
  #   # Content.create!("blah") if !@content
  # end

  # def increment_content_count
  #   Content.find(content_id).likes += 1
  # end

end
