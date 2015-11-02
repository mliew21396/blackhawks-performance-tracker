class TeamsController < ApplicationController

  def index
    respond_with Team.all
  end
end
