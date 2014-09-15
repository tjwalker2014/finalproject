class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, omniauth_providers: [:google_oauth2, :github]

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  # has_many :favourites
  # has_many :contents, through: :favourites

  has_many :contents

  has_many :authentications

  def self.find_for_oauth(kind, auth, signed_in_user=nil)
    case kind
    when "google", "github"
      if user = signed_in_user || self.find_by_email(auth.info.email)
        user.name = auth.info.name if user.name.blank?
        user.save
      elsif auth_record = Authentication.find_by_provider_and_uid(auth.provider, auth.uid)
        return auth_record.user
      else
        user = User.create do |user|
          user.name = auth.info.name
          user.email = auth.info.email
          user.password = Devise.friendly_token[0,20]
        end
      end
    when "facebook"
      raise NotImplementedError, "who wants to do this?" 
    end

    if user.persisted?
      user.authentications.where(auth.slice(:provider, :uid)).first_or_create!
    end

    user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if auth = session["devise.google_data"]
        user.name = auth.info.name
        user.email = auth.info.email
      end
    end
  end
end
