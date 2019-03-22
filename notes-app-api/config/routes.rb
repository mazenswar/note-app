Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index, :show, :create, :update, :destroy]
      resources :tags
      resources :note_tags
    end
  end

#####
end
