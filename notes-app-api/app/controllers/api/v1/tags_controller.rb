class Api::V1::TagsController < ApplicationController

  def index
    @tags = Tag.all
    render json: @tags
  end

  def show
    @tag = Tag.find(params[:id])
    render json: @tag
  end

  def create
    @tag = Tag.create(tag_params)
    render json: @tag
  end

  def update
    @tag = Tag.find(params[:id])
    @tag.update(tag_params)
    render json: @tag
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
  end

  private

  def tag_params
    params.permit(:name)
  end
end
