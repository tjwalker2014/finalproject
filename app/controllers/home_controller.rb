class HomeController < ApplicationController

  def index
    @contents = Content.all
    
    @urls = Content.uniq.pluck(:url)

    @counts = @urls.map do |url|
                blah = Content.where url:url
                blah.count
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

  def vid
    response = Net::HTTP.get(URI('https://gdata.youtube.com/api/playlists/UCF0pVplsI8R5kcAqgtoRqoA?v=2')) 
    render text: response
  end
end
