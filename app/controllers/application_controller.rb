class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_group

  def current_user
    current_person
  end

  def current_group
    #TODO: Add selected group
    if current_person.kind_of?(Person)
       current_person.groups.first
    else #NOTE Hack until we figure out the relation between Groups and API::Users or OAuth users
      Group.first
    end
  end

  def validate_admin_persmission
    render_not_found unless current_person.admin?
  end

  private

  def render_not_found
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.xml  { head :not_found }
      format.any  { head :not_found }
    end
  end

  def current_ability
    @current_ability ||= Ability.new(current_user, current_group)
  end
end
