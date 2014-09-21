module ApplicationHelper
  def favourite_button(function_name)
    if current_user
      raw("<i class='fa fa-thumbs-o-up fa-lg' ng-click='#{function_name}'></i>")
    end
  end

  def paragraph_link(content)
    types = {song: 'selectedTrackEmbed', thought: 'selectedThoughtEmbed', video: 'selectedVideoEmbed'}

    method_call_string = case content.type
      when "Thought" then "selectedThoughtEmbed('#{content.title}', '#{content.author}')"
      when "Video" then "selectedVideoEmbed('#{content.url}')"
      when "Song" then "selectedTrackEmbed('#{content.url}')"
    end

    raw("<p class='linkpara' data-rotate='##{content.type.downcase}' data-show='##{content.type.downcase}-content-div' ng-click=\"#{method_call_string}\">#{content.title}</p>")
  end
end
