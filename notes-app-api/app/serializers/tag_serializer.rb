class TagSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :note_tags
  has_many :notes, through: :note_tags
end
