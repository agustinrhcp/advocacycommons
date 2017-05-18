class MembersController < ApplicationController
  before_action :authenticate_person!

  before_action :set_members

  def index
    respond_to do |format|
      format.html
      format.json do
        render json: {
          members: JsonApi::PeopleRepresenter.for_collection.new(Person.add_event_attended(@members, current_group)),
          total_pages: @members.total_pages,
          page: @members.current_page
        }.to_json
      end
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json do
        person = Person.find(params[:id])
        render json: JsonApi::PersonWithGroupsAndEventsRepresenter.new(person).to_json
      end
    end
  end

  private

  def set_members
    @members = current_group.members.page(params[:page])
  end
end
