class CreateNoteTags < ActiveRecord::Migration[5.2]
  def change
    create_table :note_tags do |t|
      t.belongs_to :note
      t.belongs_to :tag

      t.timestamps
    end
  end
end
