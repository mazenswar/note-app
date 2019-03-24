# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Note.destroy_all
Tag.destroy_all

tags = Faker::Hipster.words(500)

100.times { Tag.create(name: tags.sample) }

50.times { Note.create(title: Faker::Book.title, content: Faker::Lorem.words(500).join(' ')) }

3.times { Note.all.each { |note| note.tags << Tag.all.sample } }


puts "Wooohoo! seeding was successful!"
