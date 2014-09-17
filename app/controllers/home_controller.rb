class HomeController < ApplicationController

  def index
    @contents = Content.all

    @zippedtopfive = Content.top_five
    #@zippedtopfive = Content.all
    #binding.pry
  
    respond_to do |format|
      format.html
      format.json {render json: current_user}
    end
  end

  def qotd
    response = Net::HTTP.get(URI('https://favqs.com/api/qotd')) 
    render text: response
  end
end
