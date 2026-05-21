import { teamMember } from "../../data/teamMember";

function TeamMemberCard() {
  return (
    <div>
        <div className="flex flex-col items-center text-center gap-6 px-10 sm:px-6 lg:px-10 xl:px-20 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
        <h2>Meet Our Team</h2>
        <p className="text-second-text">
          Problems trying to resolve the conflict between<br className="hidden md:block"/> the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>
    <div className="flex flex-col lg:flex-row items-center justify-center md:justify-between gap-8 px-10 sm:px-6 lg:px-10 xl:px-20 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto flex-wrap">
      {teamMember.map((member) => (
        <div key={member.id} className="flex flex-col w-full sm:w-80 bg-light-bg px-6 sm:px-10 py-8 items-center text-center gap-4">
          <img className="w-24 sm:w-32 h-24 sm:h-32 rounded-full object-cover" src={member.imgUrl}></img>
          <h6 className="text-primary-text">{member.position}</h6>
          <h5>{member.name} {member.surname}</h5>
          <p className="text-second-text text-sm">{member.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default TeamMemberCard;
