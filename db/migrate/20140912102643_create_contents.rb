class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.string :title
      t.string :url
      t.string :type
      t.integer :likes
      t.integer :dislikes

      t.timestamps
    end
  end
end
