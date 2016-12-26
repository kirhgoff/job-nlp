require 'nokogiri'
require 'open-uri'
require 'net/http'

file = IO.read('./samples/sample.txt')
#puts file

# Parse sentence
line = 'QxBranch is seeking a talented developer with a strong background in software engineering and computer science to join our team in Adelaide, working on innovative solutions to diverse problems.'
uri = URI('http://nlp.stanford.edu:8080/parser/index.jsp')
params = { :query => line }
uri.query = URI.encode_www_form(params)

result = Net::HTTP.get_response(uri)
#puts result.body

# Extract data from response
doc = Nokogiri::HTML(result.body)
puts doc.css('pre')[2].text