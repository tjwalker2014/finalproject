class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.string :title
      t.string :url
      t.string :type
      t.integer :user_id

      t.timestamps
    end
  end
end
