# class FavouritesController < ApplicationController
#   def create
#     @favourite = Favourite.create(content_id: @content.id, user_id: params[:user_id])
#     @favourite_count = Favourite.where(content_id: @content.id).count    
#   end
# end