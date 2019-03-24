class Note < ApplicationRecord
  has_many :note_tags
  has_many :tags, through: :note_tags

  def create_tags tags_string
    tags_arr = tags_string.split(' ');
    tags = tags_arr.map { |tag| Tag.find_or_create_by(name: tag) }
    tags.each {|tag| self.tags << tag }
  end
end
