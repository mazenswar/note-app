class NoteTagSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :tag
  belongs_to :note
end
