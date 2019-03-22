class Api::V1::NotesController < ApplicationController

  def index
    @notes = Note.all
    render json: @notes
  end

  def show
    @note = Note.find(params[:id])
    render json: @note
  end

  def create
    @note = Note.create(note_params)
    render json: @note
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_params)
    render json: @note
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
  end

  private

  def note_params
    params.permit(:title, :content)
  end


end
