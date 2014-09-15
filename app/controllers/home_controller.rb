class HomeController < ApplicationController
  def index
    @contents = Content.all
    
    @urls = Content.uniq.pluck(:url)

    @counts = @urls.map do |url|
                blah = Content.where url:url
                blah.count
              end

    @zipped = @counts.zip(@urls).sort.reverse

    #binding.pry
  
    respond_to do |format|
      format.html
      format.json {render json: current_user}
    end
  end
end
