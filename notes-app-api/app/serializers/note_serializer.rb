class NoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :content
  has_many :note_tags
  has_many :tags, through: :note_tags
end
