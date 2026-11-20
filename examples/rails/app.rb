require 'rails'
require 'action_controller/railtie'
require 'action_view/railtie'
require 'active_model'
require 'securerandom'

class Product
  include ActiveModel::Model

  attr_accessor :name, :price, :available
  validates :name, presence: true
  validates :price, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  # Local demo only: no DB, and successful edits reset on restart.
  def self.current
    @current ||= new(
      name: '手作りの文房具やお気に入りの道具をまとめて収納できる、机の上で使いやすい木製トレー',
      price: 2400, available: true
    )
  end

  def save
    return false unless valid?

    self.class.current.assign_attributes(name: name, price: price, available: available)
    true
  end
end

class ProductsController < ActionController::Base
  prepend_view_path File.expand_path('views', __dir__)
  layout 'application'

  def index
    @product = Product.current
    render
  end

  def edit
    @product = Product.current
    render
  end

  def update
    attrs = params.require(:product).permit(:name, :price, :available)
    @product = Product.new(attrs.merge(available: ActiveModel::Type::Boolean.new.cast(attrs[:available])))
    if @product.save
      redirect_to products_path(css: ("off" if params[:css] == "off")), status: :see_other
    else
      render :edit, status: 422
    end
  end

  def stylesheet
    send_file Rails.root.join('../../dist/yapr.css'), type: 'text/css', disposition: 'inline'
  end
end

class Demo < Rails::Application
  config.load_defaults 8.1
  config.root = File.expand_path(__dir__)
  config.eager_load = false
  config.secret_key_base = SecureRandom.hex(64)
  config.logger = Logger.new($stdout)
end

Demo.initialize!
Demo.routes.draw do
  root 'products#index'
  get '/products', to: 'products#index', as: :products
  get '/products/edit', to: 'products#edit', as: :edit_product
  patch '/products', to: 'products#update'
  get '/yapr.css', to: 'products#stylesheet'
end

ProductsController.include Demo.routes.url_helpers
