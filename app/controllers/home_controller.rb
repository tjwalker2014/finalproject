class HomeController < ApplicationController

  def index
    @contents = Content.all
    
    @urls = Content.uniq.pluck(:url)

    @counts = @urls.map do |url|
                itemtocount = Content.where url:url
                itemtocount.count
              end

    @zipped = @counts.zip(@urls)
    @zippedtopthree = Content.group('url').order('count_url DESC').limit(3).count('url')

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
