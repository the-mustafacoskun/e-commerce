import { teamMember } from "../../data/teamMember";

function TeamMemberCard() {
  return (
    <div>
        <div className="flex flex-col items-center text-center gap-6 px-14 py-14">
        <h2>Meet Our Team</h2>
        <p className="text-second-text">
          Problems trying to resolve the conflict between<br className="hidden md:block"/> the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>
    <div className="flex flex-col lg:flex-row items-center justify-center md:justify-between gap-8 p-20">
      {teamMember.map((member) => (
        <div key={member.id} className="flex flex-col w-60 bg-light-bg px-10 py-7.5 items-center text-center gap-4">
          <img className="w-32 h-32 rounded-full" src={member.imgUrl}></img>
          <h6 className="text-primary-text">{member.position}</h6>
          <h5>{member.name} {member.surname}</h5>
          <p className="text-second-text">{member.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default TeamMemberCard;
