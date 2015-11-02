require 'csv'

# Teams
CSV.foreach(Rails.root.join('db', 'teams.csv'),headers:true) do |team|
  Team.create!(name:team["Team"],cfpercentage:team["CF%"].to_i)
end
# Players
def time_to_minutes(time_str)
  hours, minutes, seconds = time_str.split(":").map{|str| str.to_i}
  hours * 60 + minutes + seconds / 60.0
end

def capitalize(name)
  name.split.map(&:capitalize).join(' ')
end

CSV.foreach(Rails.root.join('db', 'players.csv'),headers:true) do |player|
  Player.create!(name:capitalize(player["Player_Name"]),toi:time_to_minutes(player["TOI"]),cfpercentage:player["CF%"].to_i,team_id:2)
end
