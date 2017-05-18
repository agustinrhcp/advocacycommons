class JsonApi::PersonWithGroupsAndEventsRepresenter < JsonApi::PeopleRepresenter
  collection :events, decorator: JsonApi::EventsRepresenter
  collection :groups, decorator: JsonApi::GroupRepresenter
end
